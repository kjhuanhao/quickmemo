import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { ListNode, ListItemNode } from '@lexical/list'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import QuotePlugin from '@/components/Editor/plugins/Quote'

function Editor() {
  function onError(error: unknown) {
    console.error(error)
  }
  const initialConfig = {
    namespace: 'MyEditor',
    onError,
    nodes: [ListNode, ListItemNode]
  }

  return (
    <div className='relative top-0 w-full'>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className='no-scrollbar w-full min-h-16 h-48 p-2 overflow-auto border rounded-md bg-white focus:shadow-lg focus:outline-primary border-slate-200' />
          }
          placeholder={<div className='absolute top-2 left-2'>现在的想法是...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <QuotePlugin
          onChange={editorState => {
            console.log(editorState)
          }}
        />
        <ListPlugin />
      </LexicalComposer>
    </div>
  )
}

export default Editor
