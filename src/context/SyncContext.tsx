import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useMemosContext } from '@/context/MemosContext'
import { getAllMemosReq } from '@/api/memos'
import { MemoDataBase } from '@/utils/storage'
import { errorToast } from '@/utils'
import { getAllTagsReq } from '@/api/tags'
import { TagsDataBase } from '@/utils/storage/tagsDataBase'

interface SyncContextType {
  fetchData: () => Promise<void>
  isSync: boolean
}

// 创建上下文并提供默认值
const SyncContext = createContext<SyncContextType | undefined>(undefined)

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  const { fetchMemos } = useMemosContext()
  const [isSync, setIsSync] = useState(false)

  const fetchData = useCallback(async () => {
    setIsSync(true)
    // memo
    try {
      const memosRes = await getAllMemosReq({ page: 1, limit: 1000 })
      const memoDB = MemoDataBase.getInstance()
      memoDB.deleteAllMemos()
      for (const memo of memosRes) {
        await memoDB.addRecord(memo)
      }
    } catch (error) {
      errorToast('同步 memo 失败')
    }

    // tags
    try {
      const tagsRes = await getAllTagsReq()
      const tagDB = TagsDataBase.getInstance()
      tagDB.deleteAllTags()
      for (const tag of tagsRes) {
        tagDB.addRecord(tag)
      }
    } catch (error) {
      errorToast('同步 tags 失败')
    } finally {
      setIsSync(false)
      fetchMemos() // 确保同步后重新获取 memos
    }
  }, [fetchMemos])

  return <SyncContext.Provider value={{ fetchData, isSync }}>{children}</SyncContext.Provider>
}

export const useSyncContext = (): SyncContextType => {
  const context = useContext(SyncContext)
  if (context === undefined) {
    throw new Error('useSyncData must be used within a SyncProvider')
  }
  return context
}
