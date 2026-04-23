import { useEffect, useMemo, useState } from 'react'

type LeaderboardRow = {
  id: number
  nickname: string
  score: number
  time_spent: number
  created_at: string
}

type ScoreBoardProps = {
  score: number
  totalQuestions: number
  timeSpent: number
  onBackMenu: () => void
  onReset: () => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

const ScoreBoard = ({ score, totalQuestions, timeSpent, onBackMenu, onReset }: ScoreBoardProps) => {
  const [nickname, setNickname] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([])
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const percent = Math.round((score / totalQuestions) * 100)

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`)
      if (!response.ok) {
        throw new Error('Không tải được bảng xếp hạng')
      }

      const data = (await response.json()) as LeaderboardRow[]
      setLeaderboard(data)
    } catch {
      setStatusMessage('Không tải được bảng xếp hạng, kiểm tra backend nhé.')
    }
  }

  useEffect(() => {
    const loadLeaderboard = async () => {
      await fetchLeaderboard()
    }

    void loadLeaderboard()
  }, [])

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setStatusMessage('Nhập nickname trước đã nhé.')
      return
    }

    setIsSubmitting(true)
    setStatusMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          score,
          time_spent: timeSpent,
        }),
      })

      if (!response.ok) {
        throw new Error('Gửi điểm thất bại')
      }

      setStatusMessage('Đã lưu điểm thành công!')
      await fetchLeaderboard()
      setIsLoaded(true)
    } catch {
      setStatusMessage('Không gửi được điểm. Kiểm tra backend hoặc CORS nhé.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const bestScoreText = useMemo(() => {
    if (percent >= 80) {
      return 'Rất xịn!'
    }

    return 'Làm lại phát nữa để khè cả nhóm nhé 😎'
  }, [percent])

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-glass backdrop-blur-xl">
      <div className="text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-200">Kết quả</p>
        <h2 className="mb-2 text-3xl font-bold text-white">
          {score}/{totalQuestions} điểm
        </h2>
        <p className="mb-2 text-slate-200">
          Bạn đạt {percent}%. {bestScoreText}
        </p>
        <p className="mb-6 text-sm text-slate-300">Thời gian làm bài: {timeSpent}s</p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <label className="text-sm text-slate-200" htmlFor="nickname">
          Nickname
        </label>
        <input
          id="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="Nhập biệt danh của bạn"
          className="rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl border border-cyan-300 bg-cyan-500/20 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-500/35 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu điểm'}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Chơi lại
          </button>

          <button
            type="button"
            onClick={onBackMenu}
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Về menu
          </button>
        </div>

        {statusMessage && <p className="text-sm text-cyan-200">{statusMessage}</p>}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Leaderboard Top 10</h3>
          <button
            type="button"
            onClick={() => void fetchLeaderboard()}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        <div className="grid gap-2">
          {!leaderboard.length ? (
            <p className="text-sm text-slate-400">Chưa có dữ liệu leaderboard.</p>
          ) : (
            leaderboard.map((row, index) => (
              <div
                key={`${row.id}-${row.nickname}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-cyan-200">#{index + 1}</span>
                  <span className="font-medium">{row.nickname}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <span>{row.score} điểm</span>
                  <span>{row.time_spent}s</span>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoaded && leaderboard.length === 0 && (
          <p className="mt-3 text-xs text-slate-500">Mở backend trước để xem bảng xếp hạng.</p>
        )}
      </div>
    </div>
  )
}

export default ScoreBoard
