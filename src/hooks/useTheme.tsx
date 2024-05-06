import { useContext } from 'react'
import { ThemeProviderContext } from '@/components/ThemeProvider'

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme必须在ThemeProvider中使用')

  return context
}
