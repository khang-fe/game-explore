import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          {t('gameExplorer')}
        </Link>
        <div className="flex gap-2">
          <Button
            variant={i18n.language === 'en-US' ? 'default' : 'outline'}
            onClick={() => i18n.changeLanguage('en')}
          >
            English
          </Button>
          <Button
            variant={i18n.language === 'vi' ? 'default' : 'outline'}
            onClick={() => i18n.changeLanguage('vi')}
          >
            Tiếng Việt
          </Button>
        </div>
      </div>
    </header>
  )
}
