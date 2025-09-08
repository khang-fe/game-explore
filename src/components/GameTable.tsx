import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { useGameStore } from '@/stores/gameStore'
import { useTranslation } from 'react-i18next'
import type { GameTable } from '@/types'

interface GameTableProps {
  maxItems?: number
}

export function GameTableComp({ maxItems }: GameTableProps) {
  const { t } = useTranslation()
  const filteredTables = useGameStore((state) => state.filteredTables)
  const displayTables = maxItems
    ? filteredTables.slice(0, maxItems)
    : filteredTables
  console.log(
    'GameTableComp maxItems:',
    maxItems,
    'filteredTables:',
    filteredTables.length,
    'displayTables:',
    displayTables.length
  )

  return (
    <div className="max-w-6xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">
        {t('gameTables', { count: displayTables.length })}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('txHash')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTables.length > 0 ? (
            displayTables.map((table: GameTable) => (
              <TableRow key={table.id}>
                <TableCell>{table.id}</TableCell>
                <TableCell>{table.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      table.status === 'active' ? 'default' : 'secondary'
                    }
                  >
                    {t(table.status)}{' '}
                    {/* Dịch 'active' hoặc 'inactive' nếu cần */}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <a
                    href={`https://etherscan.io/tx/${table.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {table.txHash}
                  </a>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/game/${table.id}`}
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
                {t('noTablesFound')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
