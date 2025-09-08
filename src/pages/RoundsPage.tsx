import { useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import type { GameRound } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from 'react-i18next'

export function RoundsPage() {
  const { t } = useTranslation()
  const rounds = useGameStore((state) => state.rounds)
  const [localFilter, setLocalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredRounds = rounds.filter(
    (round) =>
      round.id.toLowerCase().includes(localFilter.toLowerCase()) ||
      round.tableId.toLowerCase().includes(localFilter.toLowerCase()) ||
      round.txHash.toLowerCase().includes(localFilter.toLowerCase())
  )
  const totalPages = Math.ceil(filteredRounds.length / itemsPerPage)
  const paginatedRounds = filteredRounds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  console.log(
    'RoundsPage: filteredRounds:',
    filteredRounds.length,
    'paginatedRounds:',
    paginatedRounds.length,
    'page:',
    currentPage,
    'totalPages:',
    totalPages
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('manageGameRounds')}</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            {t('backToHome')}
          </Link>
        </div>
        <div className="mb-6">
          <Input
            type="search"
            placeholder={t('searchRoundsPlaceholder')}
            value={localFilter}
            onChange={(e) => {
              setLocalFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="max-w-md"
          />
        </div>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-4">
            {t('allGameRounds', { count: filteredRounds.length })}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('id')}</TableHead>
                <TableHead>{t('tableId')}</TableHead>
                <TableHead>{t('roundNumber')}</TableHead>
                <TableHead>{t('winner')}</TableHead>
                <TableHead>{t('bets')}</TableHead>
                <TableHead>{t('txHash')}</TableHead>
                <TableHead>{t('timestamp')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRounds.length > 0 ? (
                paginatedRounds.map((round: GameRound) => (
                  <TableRow key={round.id}>
                    <TableCell>{round.id}</TableCell>
                    <TableCell>
                      <Link
                        to={`/game/${round.tableId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {round.tableId}
                      </Link>
                    </TableCell>
                    <TableCell>{round.roundNumber}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {round.winner}
                    </TableCell>
                    <TableCell>{round.bets}</TableCell>
                    <TableCell className="font-mono text-sm">
                      <a
                        href={`https://etherscan.io/tx/${round.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {round.txHash}
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(round.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/round/${round.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {t('details')}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    {t('noRoundsFound')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              {t('previous')}
            </Button>
            <span>
              {t('page', { current: currentPage, total: totalPages })}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              {t('next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
