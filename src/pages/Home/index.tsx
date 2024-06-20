import { SyncProvider } from '@/context/SyncContext'
import Memo from '../Memo'
function Home() {
  return (
    <SyncProvider>
      <Memo />
    </SyncProvider>
  )
}

export default Home
