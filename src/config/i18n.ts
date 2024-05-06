import i18n from 'i18next'
import dayjs from 'dayjs'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en-US.tr.json'
import cn from '@/locales/zh-CN.tr.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cn: { translation: cn }
    },
    lng: 'cn',
    interpolation: {
      escapeValue: false
    }
  })

i18n.services.formatter?.add('DD/MM/YY', value => {
  return dayjs(value).format('DD/MM/YY')
})
i18n.services.formatter?.add('YYYY-MM-DD', value => {
  return dayjs(value).format('YYYY-MM-DD')
})

export default i18n
