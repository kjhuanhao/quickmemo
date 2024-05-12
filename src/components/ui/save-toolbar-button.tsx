import React, { useCallback } from 'react'
import { Icons } from '../CustomIcons'
import { Button } from './button'
import { PlateEditor } from '@udecode/plate-common'
import { UploadImageState } from '@/context/uploadContext'
import { MemoDto } from '@/types/memo'
import { StorageStrategyFactory } from '@/utils'

interface SaveToolbarButtonProps {
  editor: PlateEditor
  state: UploadImageState
}

export const SaveToolbarButton: React.FC<SaveToolbarButtonProps> = React.memo(({ editor, state }) => {
  const handleSave = useCallback(() => {
    const imageIdList = Object.keys(state).map((key: string) => state[key].file.uid)

    const editorSaveData: MemoDto = {
      content: editor.children,
      tag: [],
      imageIdList
    }
    console.log(editorSaveData)
    StorageStrategyFactory.createStorage('local').add(editorSaveData)
    // try{
    //   successToast('保存成功')
    // }catch(error){
    //   errorToast('保存失败')
    // }
  }, [editor.children, state])

  return (
    <Button className='h-7 w-11 p-3' size='none' onClick={handleSave}>
      <Icons.send />
    </Button>
  )
})
