// import ThemeToggle from './components/ThemeToggle'
import { useTranslation } from 'react-i18next'
import { Button } from './components/ui/button'
import i18n from '@/config/i18n'
import { useState } from 'react'

function App() {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('en')
  return (
    <>
      <h1 className='text-3xl font-bold'>{t('welcome')}</h1>
      <p>{t('currentTime')}</p>
      {/* <ThemeToggle /> */}
      <Button
        className='ml-10'
        onClick={() => {
          if (language === 'en') {
            i18n.changeLanguage('cn')
            setLanguage('cn')
          } else {
            i18n.changeLanguage('en')
            setLanguage('en')
          }
        }}
      >
        {t('languageChange')}
      </Button>
    </>
  )
}

export default App
