import { cn } from '@/lib/utils'
import { MemoHeatMap } from '../MemoHeatMap'
import { TagsList } from '../TagsList'

interface MemoSidebarProps {
  className?: string
}

const MemoSidebar: React.FC<MemoSidebarProps> = ({ className }) => {
  return (
    <div className={cn('flex my-0 mx-auto w-full bg-secondSidebar-background', className)}>
      <div className='flex flex-col w-full mt-8'>
        <div className='flex justify-center w-full'>
          <MemoHeatMap />
        </div>
        <TagsList />
      </div>
    </div>
  )
}
export default MemoSidebar
