import { Plate } from '@udecode/plate-common'
import { Editor } from '@/components/ui/editor'
import { plugins } from './plugins'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MentionCombobox } from '@/components/ui/mention-combobox'
import { TComboboxItemWithData } from '@udecode/plate-combobox'
import { UploadImageProvider } from '@/context/uploadContext'
import { TagCombobox } from '@/components/ui/tag-combobox'

interface EditorProps {
  id: string
  type: string
  children: {
    text: string
  }[]
}

const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Hello, World!' }]
  }
]

const MENTIONABLES: TComboboxItemWithData<any>[] = [{ key: '0', text: 'Aayla Secura', data: 'https://' }]

const listenEditor = (value: EditorProps[]) => {
  const lastValue = value[0]
  console.log(value)
  if (lastValue.type === 'img') {
    console.log(lastValue)
  }
}

export default function PlateEditor() {
  return (
    <UploadImageProvider>
      <div className='relative top-0'>
        <TooltipProvider>
          <Plate plugins={plugins} initialValue={initialValue} onChange={value => listenEditor(value)}>
            <Editor />
            <MentionCombobox items={MENTIONABLES} />
            <TagCombobox items={MENTIONABLES} />
          </Plate>
        </TooltipProvider>
      </div>
    </UploadImageProvider>
  )
}
