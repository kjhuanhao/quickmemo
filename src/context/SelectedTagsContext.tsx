import type { Tags } from '@/types/tags'
import React, { createContext, useState } from 'react'

export interface TagsContextType {
  selectedTags: Tags[]
  setSelectedTags: React.Dispatch<React.SetStateAction<Tags[]>>
}

interface TagsProviderProps {
  children: React.ReactNode
}

const defaultTagsContext: TagsContextType = {
  selectedTags: [],
  setSelectedTags: () => {}
}

export const SelectedTagsContext = createContext<TagsContextType>(defaultTagsContext)

export const SelectedTagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([])

  return (
    <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>{children}</SelectedTagsContext.Provider>
  )
}
