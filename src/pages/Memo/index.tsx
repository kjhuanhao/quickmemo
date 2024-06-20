import Editor from '@/components/Editor'
import { Loading } from '@/components/Loading'
import { MemoCard } from '@/components/MemoCard'
import { SyncButton } from '@/components/SyncButton'
import { useMemosContext } from '@/context/MemosContext'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

function Memo() {
  const { memos, fetchMemos, fetchMemosByTag, clearMemos } = useMemosContext()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const tag = queryParams.get('tag')

  const resetAndFetchMemos = useCallback(() => {
    setPage(0)
    setHasMore(true)
    clearMemos()
    loadMoreMemos(0)
  }, [tag])

  useEffect(() => {
    resetAndFetchMemos()
  }, [tag, resetAndFetchMemos])

  const loadMoreMemos = useCallback(
    async (pageToLoad: number) => {
      if (isLoading) return

      setIsLoading(true)
      console.log('触发')

      try {
        const newMemos = tag ? await fetchMemosByTag(tag, pageToLoad) : await fetchMemos(pageToLoad)
        if (newMemos.length === 0) {
          setHasMore(false)
        } else {
          setPage(prevPage => prevPage + 1)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, fetchMemos, fetchMemosByTag, tag]
  )

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-row gap-5 mb-5 items-center'>
        <h2 className='text-3xl font-bold'>Memo</h2>
        <SyncButton />
      </div>
      <Editor />
      <div className='overflow-auto flex-1' ref={containerRef}>
        {/* 确保有高度和滚动样式 */}
        <InfiniteScroll
          pageStart={0}
          loadMore={() => loadMoreMemos(page)}
          hasMore={hasMore}
          loader={<Loading />}
          useWindow={false}
        >
          {memos.map(memo => {
            return <MemoCard key={memo.id} memo={memo} className='mt-5' />
          })}
        </InfiniteScroll>
        <div className='text-center py-3 text-stone-600'>{memos.length}条MEMO加载完成</div>
      </div>
    </div>
  )
}

export default Memo
