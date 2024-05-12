import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE } from '@udecode/plate-basic-marks'
import { MarkToolbarButton } from './marks-popover-button'
import { Icons } from '@/components/CustomIcons'
import { MARK_HIGHLIGHT } from '@udecode/plate-highlight'

export function MarksPopover() {
  return (
    <Popover>
      <PopoverTrigger className='inline-flex items-center justify-center -md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([data-icon])]:size-5 bg-transparent hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground h-9 px-2'>
        <Icons.marks />
      </PopoverTrigger>
      <PopoverContent className='flex flex-row w-full h-12'>
        <MarkToolbarButton tooltip='Bold (⌘+B)' nodeType={MARK_BOLD}>
          <Icons.bold />
        </MarkToolbarButton>
        <MarkToolbarButton tooltip='Italic (⌘+I)' nodeType={MARK_ITALIC}>
          <Icons.italic />
        </MarkToolbarButton>
        <MarkToolbarButton tooltip='Underline (⌘+U)' nodeType={MARK_UNDERLINE}>
          <Icons.underline />
        </MarkToolbarButton>
        <MarkToolbarButton tooltip='HightLight' nodeType={MARK_HIGHLIGHT}>
          <Icons.highlight />
        </MarkToolbarButton>
      </PopoverContent>
    </Popover>
  )
}
