import type { Tag } from '@/types/tags'
import { useState } from 'react'
import { Icons } from '../CustomIcons'
import { cva, type VariantProps } from 'class-variance-authority'
import { useGoTo } from '@/hooks/navigate'
import { ROUTE_KEY } from '@/router'
import { useMemosContext } from '@/context/MemosContext'

const tagItemVariants = cva('flex justify-between items-center p-2 mb-1 cursor-pointer rounded-md', {
  variants: {
    selected: {
      true: 'bg-sidebar-hover text-sidebar-text',
      false: 'hover:bg-sidebar-hover'
    }
  },
  defaultVariants: {
    selected: false
  }
})

interface TagItemProps extends VariantProps<typeof tagItemVariants> {
  tag: Tag
  selectedTagId: string | null
  onSelect: (id: string) => void
}

export const TagItem: React.FC<TagItemProps> = ({ tag, selectedTagId, onSelect }) => {
  const [expanded, setExpanded] = useState(false)
  const { go } = useGoTo()

  const { clearMemos, fetchMemosByTag } = useMemosContext()
  const handleClick = () => {
    onSelect(tag.id)
    go(ROUTE_KEY.MEMO, { tag: tag.path })
    clearMemos()
    fetchMemosByTag(tag.name, 1)
  }

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setExpanded(!expanded)
  }

  return (
    <div>
      <div className={tagItemVariants({ selected: selectedTagId === tag.id })} onClick={handleClick}>
        <div className='flex flex-row gap-1 items-center'>
          <div className='flex-shrink-0 w-4'>
            {tag.children && tag.children.length > 0 && (
              <span onClick={handleIconClick} className='cursor-pointer'>
                {expanded ? <Icons.arrowDown size={14} /> : <Icons.arrowRight size={14} />}
              </span>
            )}
          </div>
          <Icons.tag className='w-4 h-4 flex-shrink-0' />
          <span>{tag.name}</span>
        </div>
      </div>
      {expanded && tag.children && (
        <div className='pl-3'>
          {tag.children.map(child => (
            <TagItem key={child.id} tag={child} selectedTagId={selectedTagId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}
