import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { useGameStore } from '@/stores/gameStore'
import { useTranslation } from 'react-i18next'
import type { GameRound } from '@/types'

interface RoundsTableProps {
  maxItems?: number
}

export function RoundsTable({ maxItems }: RoundsTableProps) {
  const { t } = useTranslation()
  const filteredRounds = useGameStore((state) => state.filteredRounds)
  const displayRounds = maxItems
    ? filteredRounds.slice(0, maxItems)
    : filteredRounds
  console.log(
    'RoundsTable maxItems:',
    maxItems,
    'filteredRounds:',
    filteredRounds.length,
    'displayRounds:',
    displayRounds.length
  )

  return (
    <div className="max-w-6xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">
        {t('recentGameRounds', { count: displayRounds.length })}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('id')}</TableHead>
            <TableHead>{t('tableId')}</TableHead>
            <TableHead>{t('bets')}</TableHead>
            <TableHead>{t('txHash')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRounds.length > 0 ? (
            displayRounds.map((round: GameRound) => (
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
              <TableCell colSpan={5} className="text-center">
                {t('noRoundsFound')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
