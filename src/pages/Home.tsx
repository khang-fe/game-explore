import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/SearchBar'
import { StatsCards } from '@/components/StatsCards'
import { GameTableComp } from '@/components/GameTable'
import { RoundsTable } from '@/components/RoundsTable'
import { UserGrowthChart } from '@/components/UserGrowthChart'
import { RoundGrowthChart } from '@/components/RoundGrowthChart'
import { useGameStore } from '@/stores/gameStore'
import { useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation()
  const loadData = useGameStore((state) => state.loadData)

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          {t('gameExplorer')}
        </h1>
        <p className="text-center text-gray-600 mb-8">{t('checkActivities')}</p>

        <SearchBar />

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UserGrowthChart />
          <RoundGrowthChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-4 max-w-6xl w-full">
            <GameTableComp maxItems={5} />
            <Link to="/tables" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                {t('viewAllTables')}
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 max-w-6xl w-full">
            <RoundsTable maxItems={5} />
            <Link to="/rounds" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                {t('viewAllRounds')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
