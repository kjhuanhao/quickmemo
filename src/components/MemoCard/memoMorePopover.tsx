import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface MemoMorePopoverProps {
  onEdit: () => void
  onDelete: () => void
  children?: React.ReactNode
  className?: string
}
export const MemoMorePopover: React.FC<MemoMorePopoverProps> = ({ onEdit, onDelete, children, className }) => {
  return (
    <Popover>
      <PopoverTrigger className={className}>{children}</PopoverTrigger>
      <PopoverContent className='w-full'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <span className='w-20 text-sm hover:text-primary cursor-pointer text-center' onClick={() => onEdit()}>
            编辑
          </span>
          <span className='w-20 text-sm text-red-600 cursor-pointer text-center' onClick={() => onDelete()}>
            删除
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
