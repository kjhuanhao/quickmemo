import { getAllTagsReq } from '@/api/tags'
import type { Tag, TagsEntity } from '@/types/tags'
import { transformTags } from '@/utils'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface TagsContextProps {
  tags: Tag[]
  fetchTags: () => void
}

const TagsContext = createContext<TagsContextProps | undefined>(undefined)

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTags = useCallback(async () => {
    getAllTagsReq().then(res => {
      const transform = transformTags(res)
      setTags(transform)
    })
  }, [])
  useEffect(() => {
    fetchTags()
  }, [])
  return <TagsContext.Provider value={{ tags, fetchTags }}>{children}</TagsContext.Provider>
}
export const useTagsContext = () => {
  const context = useContext(TagsContext)
  if (!context) {
    throw new Error('useTagsContext must be used within a TagsContextProvider')
  }
  return context
}
