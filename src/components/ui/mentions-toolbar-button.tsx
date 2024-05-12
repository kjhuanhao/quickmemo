import { withRef } from '@udecode/cn'
import { Icons } from '@/components/CustomIcons'
import { selectEditor } from '@udecode/plate-common'
import { ToolbarButton } from './toolbar'
import { useEditorRef } from '@udecode/plate-common'

export const MentionsToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const editor = useEditorRef()
  const insertMention = () => {
    editor.insertText('@')
    selectEditor(editor, {
      at: editor.selection || undefined,
      edge: editor.selection ? undefined : 'end',
      focus: true
    })
  }

  return (
    <ToolbarButton
      ref={ref}
      tooltip='Link'
      {...rest}
      onClick={() => {
        insertMention()
      }}
    >
      <Icons.mentions />
    </ToolbarButton>
  )
})
