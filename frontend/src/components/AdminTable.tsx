import { useCallback, useEffect, useState } from 'react'

type LeaderboardRow = {
  id: number
  nickname: string
  score: number
  time_spent: number
  created_at: string
}

type AdminTableProps = {
  adminPin: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

const AdminTable = ({ adminPin }: AdminTableProps) => {
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchRows = useCallback(async () => {
    setIsLoading(true)
    setStatus('')

    try {
      const response = await fetch(`${API_BASE_URL}/admin/entries`, {
        headers: {
          'X-Admin-PIN': adminPin,
        },
      })

      if (!response.ok) {
        throw new Error('Không tải được dữ liệu admin')
      }

      const data = (await response.json()) as LeaderboardRow[]
      setRows(data)
    } catch {
      setStatus('Không tải được dữ liệu quản lý (sai PIN hoặc backend chưa chạy).')
    } finally {
      setIsLoading(false)
    }
  }, [adminPin])

  useEffect(() => {
    const load = async () => {
      await fetchRows()
    }

    void load()
  }, [fetchRows])

  const handleDelete = async (id: number) => {
    setStatus('')

    try {
      const response = await fetch(`${API_BASE_URL}/admin/leaderboard/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-PIN': adminPin,
        },
      })

      if (!response.ok) {
        throw new Error('Xóa thất bại')
      }

      setRows((prev) => prev.filter((item) => item.id !== id))
      setStatus('Đã xóa bản ghi.')
    } catch {
      setStatus('Không xóa được bản ghi.')
    }
  }

  const handleClearAll = async () => {
    setStatus('')

    try {
      const response = await fetch(`${API_BASE_URL}/admin/clear-all`, {
        method: 'DELETE',
        headers: {
          'X-Admin-PIN': adminPin,
        },
      })

      if (!response.ok) {
        throw new Error('Clear all thất bại')
      }

      setRows([])
      setStatus('Đã xóa toàn bộ dữ liệu leaderboard.')
    } catch {
      setStatus('Không xóa được toàn bộ dữ liệu.')
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-red-300/40 bg-red-500/10 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-red-200">AdminTable (Protected)</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void fetchRows()}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void handleClearAll()}
            className="rounded-lg border border-red-300/50 bg-red-400/20 px-3 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-400/30"
          >
            Clear all
          </button>
        </div>
      </div>

      {status && <p className="mb-3 text-sm text-red-100">{status}</p>}
      {isLoading && <p className="mb-3 text-sm text-slate-300">Đang tải...</p>}

      <div className="grid gap-2">
        {rows.length === 0 ? (
          <p className="text-sm text-slate-400">Không có dữ liệu để quản lý.</p>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="text-sm text-slate-100">
                <p className="font-medium">{row.nickname}</p>
                <p className="text-slate-300">Score: {row.score} • Time: {row.time_spent}s • ID: {row.id}</p>
              </div>

              <button
                type="button"
                onClick={() => void handleDelete(row.id)}
                className="rounded-lg border border-red-300/50 bg-red-400/20 px-3 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-400/30"
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default AdminTable
