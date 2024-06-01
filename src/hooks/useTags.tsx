import { SelectedTagsContext } from '@/context/SelectedTagsContext'
import { useContext } from 'react'

export const useTags = () => {
  const context = useContext(SelectedTagsContext)

  return context
}
