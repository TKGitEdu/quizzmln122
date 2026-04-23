import { useCallback, useEffect, useMemo, useState } from 'react'
import AdminTable from './components/AdminTable'
import QuizCard from './components/QuizCard'
import ScoreBoard from './components/ScoreBoard'
import { quizData } from './data/quizData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

type AppView = 'menu' | 'quiz' | 'result'
type MenuTab = 'home' | 'leaderboard' | 'guide' | 'admin'

type LeaderboardRow = {
  id: number
  nickname: string
  score: number
  time_spent: number
  created_at: string
}

function App() {
  const [view, setView] = useState<AppView>('menu')
  const [menuTab, setMenuTab] = useState<MenuTab>('home')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [startTime, setStartTime] = useState(() => Date.now())
  const [timeSpent, setTimeSpent] = useState(0)

  const [menuLeaderboard, setMenuLeaderboard] = useState<LeaderboardRow[]>([])
  const [menuStatus, setMenuStatus] = useState('')
  const [isMenuLoading, setIsMenuLoading] = useState(false)

  const [isAdminMode, setIsAdminMode] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [adminPin, setAdminPin] = useState('')
  const [pinError, setPinError] = useState('')

  const currentQuestion = quizData[currentIndex]

  const progress = useMemo(() => {
    if (view === 'menu') {
      return 0
    }

    const completed = currentIndex + (hasAnswered ? 1 : 0)
    return (completed / quizData.length) * 100
  }, [currentIndex, hasAnswered, view])

  const fetchMenuLeaderboard = useCallback(async () => {
    setIsMenuLoading(true)
    setMenuStatus('')

    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`)
      if (!response.ok) {
        throw new Error('Không tải được bảng xếp hạng')
      }

      const data = (await response.json()) as LeaderboardRow[]
      setMenuLeaderboard(data)
    } catch {
      setMenuStatus('Không tải được bảng xếp hạng, kiểm tra backend nhé.')
    } finally {
      setIsMenuLoading(false)
    }
  }, [])

  useEffect(() => {
    if (view === 'menu' && menuTab === 'leaderboard') {
      const loadLeaderboard = async () => {
        await fetchMenuLeaderboard()
      }

      void loadLeaderboard()
    }
  }, [view, menuTab, fetchMenuLeaderboard])

  const handleStartQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedOption(null)
    setHasAnswered(false)
    setTimeSpent(0)
    setStartTime(Date.now())
    setView('quiz')
  }

  const handleSelectOption = (option: string) => {
    if (hasAnswered || view !== 'quiz') {
      return
    }

    setSelectedOption(option)
    setHasAnswered(true)

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (!hasAnswered) {
      return
    }

    const isLastQuestion = currentIndex === quizData.length - 1
    if (isLastQuestion) {
      setTimeSpent(Math.round((Date.now() - startTime) / 1000))
      setView('result')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedOption(null)
    setHasAnswered(false)
  }

  const handleReset = () => {
    handleStartQuiz()
  }

  const verifyAdminPin = async () => {
    setPinError('')

    try {
      const response = await fetch(`${API_BASE_URL}/admin/entries`, {
        headers: {
          'X-Admin-PIN': pinInput.trim(),
        },
      })

      if (!response.ok) {
        throw new Error('Invalid PIN')
      }

      setAdminPin(pinInput.trim())
      setIsAdminMode(true)
      setShowPinModal(false)
      setMenuTab('admin')
      setPinInput('')
    } catch {
      setPinError('PIN không đúng hoặc backend chưa chạy.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
          <h1 className="text-sm font-semibold tracking-[0.16em] text-cyan-200">MLN-Quiz v1.0</h1>
          <p className="text-xs text-slate-300">React + Vite + Tailwind</p>
        </div>
        <div className="h-1 w-full bg-slate-800">
          <div
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-5xl flex-col items-center justify-center px-6 py-10">
        {view === 'menu' && (
          <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-glass backdrop-blur-xl">
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="rounded-xl border border-cyan-300 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/35"
              >
                Chơi Quiz
              </button>
              <button
                type="button"
                onClick={() => setMenuTab('leaderboard')}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
              >
                Bảng xếp hạng
              </button>
              <button
                type="button"
                onClick={() => setMenuTab('guide')}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
              >
                Hướng dẫn
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isAdminMode) {
                    setMenuTab('admin')
                    return
                  }
                  setShowPinModal(true)
                  setPinError('')
                }}
                className="rounded-xl border border-red-300/50 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/25"
              >
                Quản lý (Admin)
              </button>
            </div>

            {menuTab === 'home' && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-slate-200">
                <h2 className="mb-2 text-xl font-semibold text-white">Menu chính</h2>
                <p>Chọn “Chơi Quiz” để bắt đầu làm bài.</p>
              </div>
            )}

            {menuTab === 'guide' && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-slate-200">
                <h2 className="mb-2 text-xl font-semibold text-white">Hướng dẫn</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Chọn một đáp án cho từng câu.</li>
                  <li>Nhấn “Câu tiếp theo” để đi tiếp.</li>
                  <li>Cuối bài nhập nickname để lưu điểm.</li>
                </ul>
              </div>
            )}

            {menuTab === 'leaderboard' && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Bảng xếp hạng</h2>
                  <button
                    type="button"
                    onClick={() => void fetchMenuLeaderboard()}
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
                  >
                    Refresh
                  </button>
                </div>

                {isMenuLoading && <p className="text-sm text-slate-300">Đang tải...</p>}
                {menuStatus && <p className="text-sm text-cyan-200">{menuStatus}</p>}

                <div className="grid gap-2">
                  {!menuLeaderboard.length ? (
                    <p className="text-sm text-slate-400">Chưa có dữ liệu leaderboard.</p>
                  ) : (
                    menuLeaderboard.map((row, index) => (
                      <div
                        key={row.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                      >
                        <span className="text-slate-100">#{index + 1} {row.nickname}</span>
                        <span className="text-slate-300">{row.score} điểm • {row.time_spent}s</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {menuTab === 'admin' && (
              <div>
                {!isAdminMode ? (
                  <div className="rounded-2xl border border-red-300/40 bg-red-500/10 p-5 text-sm text-red-100">
                    Bạn chưa xác thực admin PIN.
                  </div>
                ) : (
                  <AdminTable adminPin={adminPin} />
                )}
              </div>
            )}
          </div>
        )}

        {view === 'quiz' && (
          <>
            <QuizCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={quizData.length}
              selectedOption={selectedOption}
              hasAnswered={hasAnswered}
              onSelect={handleSelectOption}
            />

            <button
              type="button"
              disabled={!hasAnswered}
              onClick={handleNext}
              className="mt-6 rounded-xl border border-cyan-300 bg-cyan-500/20 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-500/35 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentIndex === quizData.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
            </button>
          </>
        )}

        {view === 'result' && (
          <ScoreBoard
            score={score}
            totalQuestions={quizData.length}
            timeSpent={timeSpent}
            onBackMenu={() => setView('menu')}
            onReset={handleReset}
          />
        )}
      </main>

      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-slate-900 p-5">
            <h2 className="mb-2 text-lg font-semibold text-white">Quản lý dữ liệu</h2>
            <p className="mb-4 text-sm text-slate-300">Nhập mã PIN admin để mở chế độ quản lý.</p>

            <input
              type="password"
              value={pinInput}
              onChange={(event) => setPinInput(event.target.value)}
              placeholder="Admin PIN"
              className="mb-3 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300"
            />

            {pinError && <p className="mb-3 text-sm text-red-300">{pinError}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void verifyAdminPin()}
                className="rounded-xl border border-cyan-300 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/35"
              >
                Xác nhận
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false)
                  setPinInput('')
                  setPinError('')
                }}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
