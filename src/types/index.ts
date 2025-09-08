export interface GameTable {
  id: string
  name: string
  status: 'active' | 'ended' | 'paused'
  players: number
  totalRounds: number
  lastActivity: string // ISO date
  txHash: string // Ethereum tx hash
}

export interface GameRound {
  id: string
  tableId: string
  roundNumber: number
  winner: string
  bets: number
  txHash: string
  timestamp: string
}
