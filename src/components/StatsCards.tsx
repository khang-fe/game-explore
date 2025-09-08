import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameStore } from '@/stores/gameStore'

export function StatsCards() {
  const { stats } = useGameStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 max-w-7xl mx-auto">
      {' '}
      {/* Thay md:grid-cols-4 thành 5 */}
      <Card>
        <CardHeader>
          <CardTitle>Total Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalTables}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalRounds}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Bets (ETH)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalBets}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Games</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.activeGames}</p>
        </CardContent>
      </Card>
      <Card>
        {' '}
        {/* Thêm Card mới cho Users */}
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>
    </div>
  )
}
