import type { Tags } from '@/types/tags'
import { Icons } from '../CustomIcons'
import { cn } from '@udecode/cn'

interface SelectedTagsListProps {
  tags: Tags[]
  setTags?: React.Dispatch<React.SetStateAction<Tags[]>>
  isCancelable?: boolean
  className?: string
}

export const SelectedTagsList: React.FC<SelectedTagsListProps> = ({ className, tags, setTags, isCancelable }) => {
  return (
    <div className={cn('flex flex-row gap-2 flex-wrap overflow-y-auto max-h-20 scrollbar-transparent', className)}>
      {(tags || []).map((tag: Tags, index: number) => {
        return (
          <div key={index} className='bg-tag-foreground text-tag rounded-md text-xs p-1 backdrop-blur-lg bg-opacity-10'>
            <div className='flex flex-row items-center gap-1'>
              <span>{'#' + `${tag.name}`}</span>
              {isCancelable ? (
                <div className='flex flex-row items-center gap-1'>
                  <Icons.close
                    className='w-[13px] h-[13px] border-tag border rounded-full cursor-pointer'
                    onClick={() => {
                      setTags && setTags(tags.filter((t: Tags) => t.id !== tag.id))
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
