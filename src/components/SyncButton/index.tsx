import { useEffect } from 'react'
import { Icons } from '../CustomIcons'
import { useSyncContext } from '@/context/SyncContext'

export const SyncButton = () => {
  const { fetchData, isSync } = useSyncContext()
  useEffect(() => {})
  return (
    <Icons.reload
      className={`transition-all duration-500 outline-none ${isSync ? 'animate-spin' : 'rotate-0'} cursor-pointer`}
      tabIndex={0} // 使元素可以获得焦点
      onClick={e => {
        e.currentTarget.blur()
        fetchData()
      }} // 点击后移除焦点
    />
  )
}
