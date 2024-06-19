import React, { useCallback, useEffect, useState } from 'react'
import { Icons } from '../CustomIcons'
import { Button } from './button'
import { PlateEditor } from '@udecode/plate-common'
import { MemoDto, type MemoContent } from '@/types/memo'
import { errorToast, serialize, successToast } from '@/utils'
import { createMemosReq } from '@/api/memos'
import { useMemosContext } from '@/context/MemosContext'
import { useImageContext } from '@/context/ImageContext'
import { useTagsContext } from '@/context/SelectedTagsContext'
import { useSyncContext } from '@/context/SyncContext'

interface SaveToolbarButtonProps {
  editor: PlateEditor
}

export const SaveToolbarButton: React.FC<SaveToolbarButtonProps> = React.memo(({ editor }) => {
  const { selectedTags, setSelectedTags } = useTagsContext()
  const [localSelectedTags, setLocalSelectedTags] = useState(selectedTags)
  const { images, removeAllImages } = useImageContext()
  const { addMemo } = useMemosContext()
  const { fetchData } = useSyncContext()
  useEffect(() => {
    setLocalSelectedTags(selectedTags)
  }, [selectedTags])

  const handleSave = useCallback(() => {
    const urls = images.map(item => {
      if (item.url) {
        return item.url
      }
      errorToast('图片上传异常，请重新上传')
      throw new Error('Image URL is not available')
    })
    const html = serialize(editor.children as MemoContent[])
    if (html === '<p></p>') {
      errorToast('内容不能为空')
      return
    }
    const editorSaveData: MemoDto = {
      content: html,
      tags: localSelectedTags.map(item => item.name),
      images: urls || []
    }
    createMemosReq(editorSaveData).then(res => {
      addMemo(res)
      successToast('保存成功')
      fetchData()
      // 清空编辑器
      setSelectedTags([])
      removeAllImages()
      editor.reset()
    })
  }, [editor.children, images, localSelectedTags, addMemo])

  return (
    <Button className='h-8 w-11 p-3' size='none' onClick={handleSave}>
      <Icons.send />
    </Button>
  )
})
