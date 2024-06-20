import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Icons } from '@/components/CustomIcons'
import { TagSearch, type TagSearchProps } from '../TagSearch'

export const TagPopoverToolbarButton: React.FC<TagSearchProps> = ({ selectedTags, setSelectedTags }) => {
  return (
    <Popover>
      <PopoverTrigger className='inline-flex items-center justify-center -md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([data-icon])]:size-5 bg-transparent hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground h-9 px-2'>
        <Icons.mentions />
      </PopoverTrigger>
      <PopoverContent className='flex flex-row w-80 h-96 backdrop-blur-lg bg-opacity-10 shadow-md'>
        <TagSearch selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </PopoverContent>
    </Popover>
  )
}
