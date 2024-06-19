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
      <PopoverContent className='backdrop-blur-3xl flex flex-row p-2 gap-3 w-full bg-white'>
        <Button variant='outline' size='sms' onClick={onEdit}>
          <Icons.edit size={14} />
        </Button>
        <Button variant='destructive' size='sms' onClick={onDelete}>
          <Icons.delete size={14} />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
