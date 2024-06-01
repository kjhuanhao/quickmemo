import React, { useState } from 'react'
import type { Tags } from '@/types/tags'
import { useTags } from '@/hooks/useTags'
import { TagsDataBase } from '@/utils/storage/tagsDataBase'

export const TagSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<Tags[]>([])
  const { selectedTags, setSelectedTags } = useTags()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleTagClick = (tag: Tags) => {
    setSelectedTags((prevSelectedTags: Tags[]) => {
      if (prevSelectedTags.find(t => t.id === tag.id)) {
        // 如果标签已经被选中，则取消选中
        return prevSelectedTags.filter(t => t.id !== tag.id)
      } else {
        // 否则，添加到选中的标签列表中
        return [tag, ...prevSelectedTags]
      }
    })
  }
  const handleCreateTag = () => {
    if (searchTerm.trim() !== '') {
      const newTag: Tags = { count: 0, name: `${searchTerm}` }
      try {
        const tagsDB = TagsDataBase.getInstance()
        tagsDB.addRecord(newTag)
      } catch (error) {
        console.log('error add tags')
      }
      setResults(prevResults => [newTag, ...prevResults])
      setSelectedTags(prevSelectedTags => [newTag, ...prevSelectedTags])
      setSearchTerm('')
    }
  }

  const filteredResults = results.filter(result => result.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-72 rounded p-2'>
      <div className='flex items-center border-b border-accent-foreground pb-2'>
        <input
          type='text'
          placeholder='搜索'
          value={searchTerm}
          onChange={handleChange}
          className='w-full border-none outline-none text-base bg-transparent'
        />
      </div>
      <div className='overflow-y-auto scrollbar-transparent max-h-80'>
        <ul className='my-4'>
          {filteredResults.length === 0 && searchTerm.trim() !== '' && (
            <li className='p-2 mb-2 rounded cursor-pointer hover:bg-tag-foreground text-tag' onClick={handleCreateTag}>
              新建标签: {`# ${searchTerm}`}
            </li>
          )}
          {selectedTags.map((tag: Tags, index: number) => (
            <li
              key={`selected-${index}`}
              className='p-2 mb-2 rounded cursor-pointer text-tag bg-tag-foreground'
              onClick={() => handleTagClick(tag)}
            >
              {`# ${tag.name}`}
            </li>
          ))}
          {filteredResults
            .filter(result => !selectedTags.find(tag => tag.id === result.id))
            .map((result, index) => (
              <li
                key={index}
                className='p-2 rounded cursor-pointer hover:bg-accent mb-2'
                onClick={() => handleTagClick(result)}
              >
                {`# ${result.name}`}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
