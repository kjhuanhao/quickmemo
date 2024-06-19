import type { Tag } from '@/types/tags'
import { useState } from 'react'
import { Icons } from '../CustomIcons'
import { cva, type VariantProps } from 'class-variance-authority'

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

  const handleClick = () => {
    setExpanded(!expanded)
    onSelect(tag.id)
  }

  return (
    <div>
      <div className={tagItemVariants({ selected: selectedTagId === tag.id })} onClick={handleClick}>
        <div className='flex flex-row gap-2 items-center'>
          <Icons.tag className='w-4 h-4' />
          <span>{tag.name}</span>
        </div>
        {tag.children && tag.children.length > 0 && (
          <span>{expanded ? <Icons.arrowUp className='w-4 h-4' /> : <Icons.arrowDown className='w-4 h-4' />}</span>
        )}
      </div>
      {expanded && tag.children && (
        <div className='ml-4'>
          {tag.children.map(child => (
            <TagItem key={child.id} tag={child} selectedTagId={selectedTagId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}
