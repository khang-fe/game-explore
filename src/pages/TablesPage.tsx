import { useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import type { GameTable } from '@/types'
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
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'

export function TablesPage() {
  const { t } = useTranslation()
  const tables = useGameStore((state) => state.tables)
  const [localFilter, setLocalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredTables = tables.filter(
    (table) =>
      table.id.toLowerCase().includes(localFilter.toLowerCase()) ||
      table.name.toLowerCase().includes(localFilter.toLowerCase())
  )
  const totalPages = Math.ceil(filteredTables.length / itemsPerPage)
  const paginatedTables = filteredTables.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  console.log(
    'TablesPage: filteredTables:',
    filteredTables.length,
    'paginatedTables:',
    paginatedTables.length,
    'page:',
    currentPage,
    'totalPages:',
    totalPages
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('manageGameTables')}</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            {t('backToHome')}
          </Link>
        </div>
        <div className="mb-6">
          <Input
            type="search"
            placeholder={t('searchTablesPlaceholder')}
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
            {t('allGameTables', { count: filteredTables.length })}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('id')}</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('players')}</TableHead>
                <TableHead>{t('totalRounds')}</TableHead>
                <TableHead>{t('lastActivity')}</TableHead>
                <TableHead>{t('txHash')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTables.length > 0 ? (
                paginatedTables.map((table: GameTable) => (
                  <TableRow key={table.id}>
                    <TableCell>{table.id}</TableCell>
                    <TableCell>{table.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          table.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {t(table.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{table.players}</TableCell>
                    <TableCell>{table.totalRounds}</TableCell>
                    <TableCell>
                      {new Date(table.lastActivity).toLocaleString()}
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
                  <TableCell colSpan={8} className="text-center">
                    {t('noTablesFound')}
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
