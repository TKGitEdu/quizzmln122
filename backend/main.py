import os
from datetime import datetime
from typing import List

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    DateTime,
    desc,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
ADMIN_PIN = os.getenv('ADMIN_PIN', '1234')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# SQLAlchemy Model
class Leaderboard(Base):
  __tablename__ = 'leaderboard'
  id = Column(Integer, primary_key=True, index=True)
  nickname = Column(String, index=True)
  score = Column(Integer)
  time_spent = Column(Integer)
  created_at = Column(DateTime, default=datetime.utcnow)


# Pydantic Models
class SubmissionBase(BaseModel):
  nickname: str
  score: int
  time_spent: int


class SubmissionCreate(SubmissionBase):
  pass


class Submission(SubmissionBase):
  id: int
  created_at: datetime

  class Config:
    from_attributes = True


# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)


# Dependency to get DB session
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def verify_admin_pin(admin_pin: str | None = Header(default=None, alias='X-Admin-PIN')):
  if admin_pin != ADMIN_PIN:
    raise HTTPException(status_code=403, detail='Forbidden: invalid admin PIN')


@app.post('/submit', response_model=Submission)
def create_submission(submission: SubmissionCreate, db: Session = Depends(get_db)):
  db_submission = Leaderboard(
    nickname=submission.nickname,
    score=submission.score,
    time_spent=submission.time_spent,
  )
  db.add(db_submission)
  db.commit()
  db.refresh(db_submission)
  return db_submission


@app.get('/leaderboard', response_model=List[Submission])
def read_leaderboard(db: Session = Depends(get_db)):
  return (
    db.query(Leaderboard)
    .order_by(desc(Leaderboard.score), Leaderboard.time_spent)
    .limit(10)
    .all()
  )


@app.get('/admin/entries', response_model=List[Submission])
def read_all_entries(
  _: None = Depends(verify_admin_pin),
  db: Session = Depends(get_db),
):
  return db.query(Leaderboard).order_by(desc(Leaderboard.created_at)).all()


@app.delete('/admin/leaderboard/{entry_id}')
def delete_entry(
  entry_id: int,
  _: None = Depends(verify_admin_pin),
  db: Session = Depends(get_db),
):
  entry = db.query(Leaderboard).filter(Leaderboard.id == entry_id).first()
  if not entry:
    raise HTTPException(status_code=404, detail='Entry not found')

  db.delete(entry)
  db.commit()
  return {'ok': True, 'deleted_id': entry_id}


@app.delete('/admin/clear-all')
def clear_all_entries(
  _: None = Depends(verify_admin_pin),
  db: Session = Depends(get_db),
):
  deleted_count = db.query(Leaderboard).delete()
  db.commit()
  return {'ok': True, 'deleted_count': deleted_count}
