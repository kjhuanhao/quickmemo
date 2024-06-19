import type { Tag } from '@/types/tags'
import { transformTags } from '@/utils'
import { TagsDataBase } from '@/utils/storage/tagsDataBase'
import React, { useState, useEffect } from 'react'
import { TagItem } from './tagItem'

export const TagsList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)
  useEffect(() => {
    const fetchTags = async () => {
      const tagsDB = TagsDataBase.getInstance()
      const response = await tagsDB.getAllRecords()
      const transformedTags = transformTags(response)
      setTags(transformedTags)
    }

    fetchTags()
  }, [])
  const handleSelect = (id: string) => {
    setSelectedTagId(id)
  }
  return (
    <div className='p-4'>
      <h2 className='text-lg font-semibold text-sidebar-text mb-3'>全部标签</h2>
      {tags.map(tag => (
        <TagItem key={tag.id} tag={tag} selectedTagId={selectedTagId} onSelect={handleSelect} />
      ))}
    </div>
  )
}
