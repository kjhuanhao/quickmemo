import { SyncProvider } from '@/context/SyncContext'
import Memo from '../Memo'
import { MemoProvider } from '@/context/MemosContext'
function Home() {
  return (
    <MemoProvider>
      <SyncProvider>
        <Memo />
      </SyncProvider>
    </MemoProvider>
  )
}

export default Home
