import { Icons } from '@/components/CustomIcons'
import Editor from '@/components/Editor'
import { MemoCard } from '@/components/MemoCard'
import { SyncButton } from '@/components/SyncButton'
import { useMemosContext } from '@/context/MemosContext'
import type { MemoEntity } from '@/types/memo'
import { useEffect, useState } from 'react'

function Memo() {
  const { memos, fetchMemos } = useMemosContext()
  const [data, setData] = useState<MemoEntity[]>(memos)
  useEffect(() => {
    console.log('Memos updated:', memos) //
    setData(memos)
  }, [memos])

  return (
    <div>
      <div className='flex flex-row gap-5 mb-5 items-center h-full'>
        <h2 className='text-3xl font-bold'>Memo</h2>
        <SyncButton />
      </div>
      <Editor />
      <div className='mt-5 overflow-auto '>
        <div className='mt-5'>
          {data.map((memo, index) => {
            return <MemoCard key={memo.id} memo={memo} className='mt-5' />
          })}
        </div>
      </div>
    </div>
  )
}

export default Memo
