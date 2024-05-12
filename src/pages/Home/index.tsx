import Editor from '@/components/Editor'
import MemoCard from '@/components/MemoCard'
import { StorageStrategyFactory } from '@/utils'
import { useEffect } from 'react'
import { errorToast } from '@/utils'

function Home() {
  useEffect(() => {
    // 初始化存储器
    const initializeStorage = async () => {
      const isInit = await StorageStrategyFactory.createStorage('local').initialize()
      if (isInit) {
        console.log('初始化存储成功')
      } else {
        errorToast('初始化存储失败，编辑器将无法正常使用')
      }
    }
    initializeStorage()
  }, [])
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
