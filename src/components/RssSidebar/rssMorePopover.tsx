import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { Icons } from '../CustomIcons'

interface MorePopoverProps {
  onEdit: () => void
  onDelete: () => void
  onClick?: () => void
}

export const RssMorePopover: React.FC<MorePopoverProps> = ({ onEdit, onDelete, onClick }) => {
  return (
    <Popover>
      <PopoverTrigger
        className='ml-auto'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick()
        }}
      >
        <Icons.more className='text-[#6C6B6D]' />
      </PopoverTrigger>
      <PopoverContent className='backdrop-blur-3xl flex flex-row gap-3 w-full bg-white'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <span className='w-20 text-sm hover:text-primary cursor-pointer text-center' onClick={onEdit}>
            编辑
          </span>
          <span className='w-20 text-sm text-red-600 cursor-pointer text-center' onClick={onDelete}>
            删除
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
