import React, { useContext } from 'react'
import { InsertDropdownMenu } from './insert-dropdown-menu'
import { ToolbarGroup } from './toolbar'
import { MentionsToolbarButton } from './mentions-toolbar-button'
import { MarksPopover } from './popover-marks'
import { ImageToolbarButton } from './image-toolbar-button'
import { ListToolbarButton } from './list-toolbar-button'
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'
import { SaveToolbarButton } from './save-toolbar-button'
import { useEditorRef } from '@udecode/plate-common'
import { UploadImageContext } from '@/context/uploadContext'

export const FixedToolbarButtons = React.memo(() => {
  const editor = useEditorRef()
  const { state } = useContext(UploadImageContext)
  return (
    <div className='w-full overflow-hidden'>
      <div
        className='flex flex-wrap'
        style={{
          transform: 'translateX(calc(-1px))'
        }}
      >
        <ToolbarGroup noSeparator>
          <InsertDropdownMenu />
          <ImageToolbarButton />
        </ToolbarGroup>

        <ToolbarGroup>
          <MarksPopover />
          <ListToolbarButton nodeType={ELEMENT_UL} />
          <ListToolbarButton nodeType={ELEMENT_OL} />
        </ToolbarGroup>

        <ToolbarGroup>
          <MentionsToolbarButton />
        </ToolbarGroup>

        <div className='grow' />
        <ToolbarGroup noSeparator>
          <SaveToolbarButton editor={editor} state={state} />
        </ToolbarGroup>
      </div>
    </div>
  )
})
