import React, { createContext, useContext, useState, useCallback } from 'react'
import type { MemoEntity } from '@/types/memo'
import { MemoDataBase } from '@/utils/storage'

interface MemosContextProps {
  memos: MemoEntity[]
  addMemo: (memo: MemoEntity) => void
  clearMemos: () => void
  fetchMemos: (page: number, pageSize?: number) => Promise<MemoEntity[]>
  fetchMemosByTag: (tag: string, page: number, pageSize?: number) => Promise<MemoEntity[]>
}

const MemosContext = createContext<MemosContextProps | undefined>(undefined)

export const MemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memos, setMemos] = useState<MemoEntity[]>([])

  const fetchMemos = useCallback(async (page: number, pageSize: number = 10) => {
    const memoDB = MemoDataBase.getInstance()
    const paginatedMemos = await memoDB.getRecordsByPage(page, pageSize)
    setMemos(prevMemos => {
      const newMemos = paginatedMemos.filter(memo => !prevMemos.some(m => m.id === memo.id))
      return [...prevMemos, ...newMemos]
    })
    console.log(paginatedMemos, '123456memo')
    return paginatedMemos
  }, [])

  const fetchMemosByTag = useCallback(async (tag: string, page: number, pageSize: number = 10) => {
    const memoDB = MemoDataBase.getInstance()
    const paginatedMemos = await memoDB.findMemosByTag(tag, page, pageSize)
    setMemos(prevMemos => {
      const newMemos = paginatedMemos.filter(memo => !prevMemos.some(m => m.id === memo.id))
      return [...prevMemos, ...newMemos]
    })

    console.log(paginatedMemos, '123memo')
    return paginatedMemos
  }, [])

  const addMemo = useCallback(async (memo: MemoEntity) => {
    const memoDB = MemoDataBase.getInstance()
    await memoDB.addRecord(memo)
    setMemos(prevMemos => [memo, ...prevMemos])
  }, [])

  const clearMemos = useCallback(() => {
    setMemos([])
  }, [])
  return (
    <MemosContext.Provider value={{ memos, addMemo, fetchMemos, fetchMemosByTag, clearMemos }}>
      {children}
    </MemosContext.Provider>
  )
}

export const useMemosContext = (): MemosContextProps => {
  const context = useContext(MemosContext)
  if (!context) {
    throw new Error('useMemosContext must be used within a MemoProvider')
  }
  return context
}
