import { useParams } from 'react-router-dom'
import { useGameStore } from '@/stores/gameStore'

export function RoundDetail() {
  const { id } = useParams<{ id: string }>()
  const rounds = useGameStore((state) => state.rounds)
  const round = rounds.find((r) => r.id === id)

  if (!round) return <div>Round not found</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Game Round: {id}</h1>
        <p>
          Table ID: {round.tableId} | Round Number: {round.roundNumber}
        </p>
        <p>
          Winner: {round.winner} | Bets: {round.bets} ETH
        </p>
        <p>
          Tx Hash:{' '}
          <a
            href={`https://etherscan.io/tx/${round.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Etherscan
          </a>
        </p>
        <p>Timestamp: {new Date(round.timestamp).toLocaleString()}</p>
      </div>
    </div>
  )
}
