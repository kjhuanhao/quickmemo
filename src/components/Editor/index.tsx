import { createPlateEditor, Plate } from '@udecode/plate-common'
import { Editor } from '@/components/ui/editor'
import { plugins } from './plugins'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SelectedTagsProvider } from '@/context/SelectedTagsContext'
import { ImageProvider } from '@/context/ImageContext'
import { useEffect, useMemo, useState } from 'react'
import { deserialize } from '@/utils'

interface EditorProps {
  html?: string
}

const PlateEditor: React.FC<EditorProps> = ({ html }) => {
  const [initialValue, setInitialValue] = useState<any[] | undefined>(undefined)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (html) {
      const value = deserialize(html)
      setInitialValue(value.length > 0 ? value : initialValue)
      setKey(prevKey => prevKey + 1) // 更新 key 以强制重新渲染 Plate 组件
      console.log(value, 'edit')
    }
  }, [html])

  const editor = useMemo(() => createPlateEditor(), [])

  return (
    <div className='p-1'>
      <SelectedTagsProvider>
        <ImageProvider>
          <div className='relative top-0'>
            <TooltipProvider>
              <Plate key={key} editor={editor} plugins={plugins} initialValue={initialValue}>
                <Editor placeholder='Typing something here...' />
              </Plate>
            </TooltipProvider>
          </div>
        </ImageProvider>
      </SelectedTagsProvider>
    </div>
  )
}

export default PlateEditor
