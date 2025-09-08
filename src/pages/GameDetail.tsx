import { useParams } from 'react-router-dom'
import { useGameStore } from '@/stores/gameStore'

export function GameDetail() {
  const { id } = useParams<{ id: string }>()
  const tables = useGameStore((state) => state.tables)
  const table = tables.find((t) => t.id === id)

  if (!table) return <div>Table not found</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">
          Game Table: {table.name} ({id})
        </h1>
        <p>
          Status: {table.status} | Players: {table.players}
        </p>
        <p>Last Activity: {new Date(table.lastActivity).toLocaleString()}</p>
        <p>
          Tx Hash:{' '}
          <a
            href={`https://etherscan.io/tx/${table.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Etherscan
          </a>
        </p>
        {/* Thêm table cho rounds nếu cần, fetch từ store hoặc API */}
      </div>
    </div>
  )
}
