import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useMemosContext } from '@/context/MemosContext'
import { getAllMemosReq } from '@/api/memos'
import { MemoDataBase } from '@/utils/storage'
import { errorToast, promiseToast } from '@/utils'
import { getAllTagsReq } from '@/api/tags'
import { TagsDataBase } from '@/utils/storage/tagsDataBase'
import { useTagsContext } from './TagsContext'

interface SyncContextType {
  fetchData: () => Promise<void>
  isSync: boolean
}

// 创建上下文并提供默认值
const SyncContext = createContext<SyncContextType | undefined>(undefined)

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  const { fetchMemos } = useMemosContext()
  const { fetchTags } = useTagsContext()
  const [isSync, setIsSync] = useState(false)

  const fetchData = useCallback(async () => {
    setIsSync(true)

    const syncData = () => {
      return new Promise<void>((resolve, reject) => {
        // memo
        const syncMemos = async () => {
          try {
            const memosRes = await getAllMemosReq()
            const memoDB = MemoDataBase.getInstance()
            memoDB.deleteAllMemos()
            for (const memo of memosRes) {
              await memoDB.addRecord(memo)
            }
          } catch (error) {
            errorToast('同步 memo 失败')
            reject(error)
          }
        }

        // tags
        const syncTags = async () => {
          try {
            const tagsRes = await getAllTagsReq()
            const tagDB = TagsDataBase.getInstance()
            tagDB.deleteAllTags()
            for (const tag of tagsRes) {
              tagDB.addRecord(tag)
            }
          } catch (error) {
            errorToast('同步 tags 失败')
            reject(error)
          }
        }

        syncMemos()
          .then(syncTags)
          .then(() => resolve())
          .catch(reject)
      })
    }

    try {
      const promise = syncData()
      promiseToast(promise, '正在同步', '同步成功', '同步失败')
      await promise // 等待同步数据完成
    } finally {
      setIsSync(false)
      fetchMemos(1) // 确保同步后重新获取 memos
      fetchTags()
    }
  }, [fetchMemos, fetchTags])

  return <SyncContext.Provider value={{ fetchData, isSync }}>{children}</SyncContext.Provider>
}

export const useSyncContext = (): SyncContextType => {
  const context = useContext(SyncContext)
  if (context === undefined) {
    throw new Error('useSyncData must be used within a SyncProvider')
  }
  return context
}
