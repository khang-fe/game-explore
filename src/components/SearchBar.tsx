import { Input } from '@/components/ui/input'
import { useGameStore } from '@/stores/gameStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function SearchBar() {
  const { t } = useTranslation()
  const setSearchFilter = useGameStore((state) => state.setSearchFilter)
  const [query, setQuery] = useState('') // Local state cho input

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchFilter(query) // Cập nhật store
  }

  return (
    <div className="flex justify-center my-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <Input
          type="search"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-lg py-6 border-2 border-gray-300 focus:border-blue-500 rounded-xl shadow-lg"
        />
      </form>
    </div>
  )
}
