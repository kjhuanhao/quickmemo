import { useContext } from 'react'
import { ThemeProviderContext } from '@/context/ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme必须在ThemeProvider中使用')

  return context
}
