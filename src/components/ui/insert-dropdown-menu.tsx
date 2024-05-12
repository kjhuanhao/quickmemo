import React from 'react'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { focusEditor, insertEmptyElement, useEditorRef } from '@udecode/plate-common'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { Icons } from '@/components/CustomIcons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'
import { ELEMENT_CODE_BLOCK, insertEmptyCodeBlock } from '@udecode/plate-code-block'
import { toggleList } from '@udecode/plate-list'
import { ELEMENT_LINK, triggerFloatingLink } from '@udecode/plate-link'
import { ELEMENT_IMAGE } from '@udecode/plate-media'

const items = [
  {
    label: 'Insert',
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: 'Paragraph',
        description: 'Paragraph',
        icon: Icons.paragraph
      },
      // {
      //   value: ELEMENT_BLOCKQUOTE,
      //   label: 'Quote',
      //   description: 'Quote (⌘+⇧+.)',
      //   icon: Icons.blockquote
      // },
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
      },
      {
        value: ELEMENT_LINK,
        label: 'Link',
        description: 'Link',
        icon: Icons.link
      },
      {
        value: ELEMENT_CODE_BLOCK,
        label: 'Code',
        description: 'Code (```)',
        icon: Icons.codeblock
      },
      {
        value: ELEMENT_IMAGE,
        label: 'Image',
        description: 'Image',
        icon: Icons.image
      }
    ]
  }
  // {
  //   label: 'Media',
  //   items: [
  //     {
  //       value: ELEMENT_CODE_BLOCK,
  //       label: 'Code',
  //       description: 'Code (```)',
  //       icon: Icons.codeblock
  //     }

  //     {
  //       value: ELEMENT_MEDIA_EMBED,
  //       label: 'Embed',
  //       description: 'Embed',
  //       icon: Icons.embed,
  //     },
  //     {
  //       value: ELEMENT_EXCALIDRAW,
  //       label: 'Excalidraw',
  //       description: 'Excalidraw',
  //       icon: Icons.excalidraw,
  //     },
  //   ],
  // },
  // {
  //   label: 'Inline',
  //   items: [
  //     {
  //       value: ELEMENT_LINK,
  //       label: 'Link',
  //       description: 'Link',
  //       icon: Icons.link
  //     }
  //   ]
  // }
  // ]
  // }
]

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='Insert' isDropdown>
          <Icons.add />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto'>
        {items.map(({ items: nestedItems, label }, index) => (
          <React.Fragment key={label}>
            {index !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {nestedItems.map(({ value: type, label: itemLabel, icon: Icon }) => (
              <DropdownMenuItem
                key={type}
                className='min-w-[180px]'
                onSelect={async () => {
                  switch (type) {
                    case ELEMENT_CODE_BLOCK: {
                      insertEmptyCodeBlock(editor)

                      break
                    }
                    case ELEMENT_IMAGE: {
                      // await insertMedia(editor, { type: ELEMENT_IMAGE })
                      // 调用 文件 API

                      break
                    }
                    // case ELEMENT_MEDIA_EMBED: {
                    //   await insertMedia(editor, {
                    //     type: ELEMENT_MEDIA_EMBED,
                    //   });
                    //
                    //   break;
                    // }
                    case 'ul':
                    case 'ol': {
                      insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                        select: true,
                        nextBlock: true
                      })

                      toggleList(editor, { type })
                      // if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
                      //   toggleIndentList(editor, {
                      //     listStyleType: type === 'ul' ? 'disc' : 'decimal',
                      //   });
                      // } else if (settingsStore.get.checkedId('list')) {
                      //   toggleList(editor, { type });
                      // }

                      break
                    }
                    // case ELEMENT_TABLE: {
                    //   insertTable(editor);
                    //
                    //   break;
                    // }
                    case ELEMENT_LINK: {
                      triggerFloatingLink(editor, { focused: true })
                      break
                    }
                    default: {
                      insertEmptyElement(editor, type!, {
                        select: true,
                        nextBlock: true
                      })
                    }
                  }
                  focusEditor(editor)
                }}
              >
                <Icon className='mr-2 size-5' />
                {itemLabel}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
