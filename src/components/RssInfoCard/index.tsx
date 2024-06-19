import { getRssSubscriptionByGroupReq, getRssSubscriptionByRssIdReq } from '@/api/rss'
import { getTimByTimeString, successToast } from '@/utils'
import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Loading } from '../Loading'
import { Icons } from '../CustomIcons'

export const RssInfoCard = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const rssId = queryParams.get('rssId')
  const group = queryParams.get('group')
  const [rssData, setRssData] = useState<RssInfoResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchRssData = useCallback(async () => {
    setLoading(true)
    if (rssId) {
      const res = await getRssSubscriptionByRssIdReq(rssId)
      setRssData(res)
    }
    if (group) {
      const res = await getRssSubscriptionByGroupReq(group)
      setRssData(res)
    }
    setLoading(false)
    console.log(rssData, 'data')
  }, [rssId, group])

  useEffect(() => {
    fetchRssData()
  }, [fetchRssData])

  return (
    <div>
      {loading && <Loading />}
      {!loading && rssData && (
        <div className='flex flex-col gap-3 py-2'>
          <div className='flex flex-col gap-4'>
            {rssData.map(item => {
              return (
                <div
                  key={item.id}
                  className='flex flex-col relative gap-3 rounded-lg p-4 hover:bg-[#E9E9EA] dark:hover:bg-[#383636] cursor-pointer'
                  onClick={() => {
                    window.open(item.url)
                  }}
                >
                  <div className='text-sm'>
                    <h3 className='text-[#6C6B6D] dark:text-[#D9D9D9]'>{item.author}</h3>
                  </div>
                  <div className='text-lg font-bold text-[#6C6B6D] dark:text-[#D9D9D9]'>{item.title}</div>
                  <div className='text-sm text-[#6C6B6D] dark:text-[#D9D9D9]'>
                    {getTimByTimeString(item.createdTime)}
                  </div>
                  <Icons.share
                    size={30}
                    className='absolute right-4 bottom-4 cursor-pointer hover:bg-[#D8D8D8] dark:hover:bg-[#383636] rounded-md p-1'
                    onClick={e => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(item.url)
                      successToast('复制成功，快去分享吧！')
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {!rssData || (rssData.length === 0 && <div>没有数据</div>)}
    </div>
  )
}
