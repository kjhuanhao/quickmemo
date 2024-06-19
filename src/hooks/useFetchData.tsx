import { useMemosContext } from '@/context/MemosContext'
import { useCallback, useState } from 'react'
import { getAllMemosReq } from '@/api/memos'
import { MemoDataBase } from '@/utils/storage'
import { errorToast } from '@/utils'
import { getAllTagsReq } from '@/api/tags'
import { TagsDataBase } from '@/utils/storage/tagsDataBase'

// 导出 fetchData 方法
export const useFetchData = () => {
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

  return { fetchData, isSync }
}
