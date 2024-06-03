import Editor from '@/components/Editor'
import MemoCard from '@/components/MemoCard'
import { useEffect } from 'react'

function Home() {
  return (
    <div>
      <Editor />
      <div className='flex flex-col gap-2 mt-5'>
        <MemoCard />
      </div>
    </div>
  )
}

export default Home
