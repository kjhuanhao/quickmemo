import React, { useCallback, useEffect, useState } from 'react'
import { Icons } from '../CustomIcons'
import { Button } from './button'
import { PlateEditor } from '@udecode/plate-common'
import { UploadImageState } from '@/context/uploadContext'
import { MemoDto, type MemoContent } from '@/types/memo'
import { serialize } from '@/utils'
import { useTags } from '@/hooks/useTags'

interface SaveToolbarButtonProps {
  editor: PlateEditor
  state: UploadImageState
}

export const SaveToolbarButton: React.FC<SaveToolbarButtonProps> = React.memo(({ editor, state }) => {
  const { selectedTags } = useTags()
  const [localSelectedTags, setLocalSelectedTags] = useState(selectedTags)

  useEffect(() => {
    setLocalSelectedTags(selectedTags)
  }, [selectedTags])

  const handleSave = useCallback(() => {
    const imageIdList = Object.keys(state).map((key: string) => state[key].file.uid)
    const html = serialize(editor.children as MemoContent[])
    const editorSaveData: MemoDto = {
      content: html,
      tag: localSelectedTags.map(item => item.name),
      imageIdList
    }
    console.log(editorSaveData)
  }, [editor.children, state, localSelectedTags])

  return (
    <Button className='h-7 w-11 p-3' size='none' onClick={handleSave}>
      <Icons.send />
    </Button>
  )
})
