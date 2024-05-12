import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import {
  collapseSelection,
  findNode,
  focusEditor,
  isBlock,
  isCollapsed,
  TElement,
  toggleNodeType,
  useEditorRef,
  useEditorSelector
} from '@udecode/plate-common'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

import { Icons } from '@/components/CustomIcons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'
import { toggleList, unwrapList } from '@udecode/plate-list'
import { ELEMENT_LINK } from '@udecode/plate-link'
import { Description } from '@radix-ui/react-dialog'

const items = [
  {
    value: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
    description: 'Paragraph',
    icon: Icons.paragraph
  },
  {
    value: ELEMENT_BLOCKQUOTE,
    label: 'Quote',
    description: 'Quote (⌘+⇧+.)',
    icon: Icons.blockquote
  },
  {
    value: 'ul',
    label: 'Bulleted list',
    description: 'Bulleted list',
    icon: Icons.ul
  },
  {
    value: 'ol',
    label: 'Numbered list',
    description: 'Numbered list',
    icon: Icons.ol
  }
  // {
  //   value: ELEMENT_LINK,
  //   label: 'Link',
  //   description: 'Link',
  //   icon: Icons.link,
  // }
]

const defaultItem = items.find(item => item.value === ELEMENT_PARAGRAPH)!

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector(editor => {
    if (isCollapsed(editor.selection)) {
      const entry = findNode<TElement>(editor, {
        match: n => isBlock(editor, n)
      })

      if (entry) {
        return items.find(item => item.value === entry[0].type)?.value ?? ELEMENT_PARAGRAPH
      }
    }

    return ELEMENT_PARAGRAPH
  }, [])

  const editor = useEditorRef()
  const openState = useOpenState()

  const selectedItem = items.find(item => item.value === value) ?? defaultItem
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='Turn into' isDropdown className='lg:min-w-[130px]'>
          <SelectedItemIcon className='size-5 lg:hidden' />
          {/* <span className='max-lg:hidden'>{selectedItemLabel}</span> */}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='min-w-0'>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className='flex flex-col gap-0.5'
          value={value}
          onValueChange={type => {
            if (type === 'ul' || type === 'ol') {
              toggleList(editor, { type })
            } else {
              unwrapList(editor)
              toggleNodeType(editor, { activeType: type })
            }
            // if (type === 'ul' || type === 'ol') {
            //   if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
            //     toggleIndentList(editor, {
            //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
            //     });
            //   } else if (settingsStore.get.checkedId('list')) {
            //     toggleList(editor, { type });
            //   }
            // } else {
            //   unwrapList(editor);

            // }

            collapseSelection(editor)
            focusEditor(editor)
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem key={itemValue} value={itemValue} className='min-w-[180px]'>
              <Icon className='mr-2 size-5' />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
