import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { MemoEntity } from '@/types/memo'
import { MemoDataBase } from '@/utils/storage'

interface MemosContextProps {
  memos: MemoEntity[]
  addMemo: (memo: MemoEntity) => void
  fetchMemos: () => void
}

const MemosContext = createContext<MemosContextProps | undefined>(undefined)

export const MemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memos, setMemos] = useState<MemoEntity[]>([])

  const fetchMemos = useCallback(async () => {
    const memoDB = MemoDataBase.getInstance()
    const allMemos = await memoDB.getAllRecords()
    setMemos(allMemos)
  }, [])

  const addMemo = useCallback(async (memo: MemoEntity) => {
    const memoDB = MemoDataBase.getInstance()
    await memoDB.addRecord(memo)
    setMemos(prevMemos => [memo, ...prevMemos])
  }, [])

  useEffect(() => {
    fetchMemos()
  }, [fetchMemos])

  return <MemosContext.Provider value={{ memos, addMemo, fetchMemos }}>{children}</MemosContext.Provider>
}

export const useMemosContext = (): MemosContextProps => {
  const context = useContext(MemosContext)
  if (!context) {
    throw new Error('useMemosContext must be used within a MemoProvider')
  }
  return context
}
