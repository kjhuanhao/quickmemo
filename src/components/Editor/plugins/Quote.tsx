import { useEffect } from 'react'
import type { EditorState } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

type OnChangeFunc = (editorState: EditorState) => void

export default function QuotePlugin(props: { onChange: OnChangeFunc }): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const { onChange } = props
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }),
    [onchange, editor]
  return null
}
