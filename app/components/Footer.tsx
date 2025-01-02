"use client"
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 {t('aquaponicsSolution')}
        </p>
        <div className="space-x-2">
          <Button variant="outline" size="sm">{t('refreshData')}</Button>
          <Button variant="outline" size="sm">{t('contactSupport')}</Button>
        </div>
      </div>
    </footer>
  )
}

