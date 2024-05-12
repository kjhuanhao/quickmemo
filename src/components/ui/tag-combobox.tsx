import { ComboboxProps } from '@udecode/plate-combobox'
import { getPluginOptions, useEditorRef } from '@udecode/plate-common'
import { ELEMENT_TAG, TAGPlugin, getMentionOnSelectItem } from '@/lib/plugins/tagPlugin'

import { Combobox } from './combobox'

export function TagCombobox({
  pluginKey = ELEMENT_TAG,
  id = pluginKey,
  ...props
}: Partial<ComboboxProps> & {
  pluginKey?: string
}) {
  const editor = useEditorRef()

  const { trigger } = getPluginOptions<TAGPlugin>(editor, pluginKey)

  return (
    <div onMouseDown={e => e.preventDefault()}>
      <Combobox
        id={id}
        trigger={trigger!}
        controlled
        onSelectItem={getMentionOnSelectItem({
          key: pluginKey
        })}
        {...props}
      />
    </div>
  )
}
