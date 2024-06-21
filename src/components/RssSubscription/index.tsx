import { getAllRssReq, subscribeReq, getAllRssTypeReq } from '@/api/rss'
import { cva } from 'class-variance-authority'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '../CustomIcons'
import { SubscriptionDialog } from './subscriptionDialog'

const rssItemVariants = cva(
  'flex flex-col pad:flex-col items-start rounded-xl shadow-md p-3 w-full h-44 pad:w-80 gap-2 bg-card',
  {
    variants: {
      selected: {
        true: '',
        false: 'bg-card'
      }
    },
    defaultVariants: {
      selected: false
    }
  }
)

const categoryItemVariants = cva('px-5 py-1 rounded-lg cursor-pointer shadow-xl', {
  variants: {
    selected: {
      true: 'bg-primary text-white',
      false: 'hover:bg-primary hover:text-white bg-card'
    }
  },
  defaultVariants: {
    selected: false
  }
})

export const RssSubscription = React.memo(() => {
  const [rssList, setRssList] = useState<Rss[] | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // 获取所有的 rss 订阅列表
    getAllRssReq().then(res => {
      setRssList(res)
    })

    // 获取所有分类
    getAllRssTypeReq().then(res => {
      setCategories(['全部', ...res])
    })
  }, [])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }
  const handleSubscriptionChange = useCallback((rssId: string, isSubscribed: boolean) => {
    setRssList(prevRssList =>
      prevRssList?.map(item => (item.id === rssId ? { ...item, selected: isSubscribed } : item))
    )
  }, [])

  const filteredRssList = selectedCategory === '全部' ? rssList : rssList?.filter(rss => rss.type === selectedCategory)

  return (
    <div>
      <h2 className='text-3xl font-bold'>订阅星球</h2>
      <div className='flex flex-wrap gap-2 mt-5'>
        {categories.map(category => (
          <div
            key={category}
            className={categoryItemVariants({ selected: selectedCategory === category })}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-6 w-full items-center mt-7'>
        {filteredRssList?.map(rss => (
          <div key={rss.id} className={cn(rssItemVariants({ selected: rss.selected }), 'relative')}>
            <div className='flex flex-row gap-2 items-center'>
              <img src={rss.icon} className='w-10 h-10 mb-3 pad:mb-0 pad:mr-2 ml-2 rounded-full' />
              <h2 className='text-lg font-bold '>{rss.name}</h2>
            </div>
            <div className='text-base indent-8 line-clamp-3 text-card-text mr-2'>{rss.description}</div>
            <div className='absolute right-3 bottom-1 cursor-pointer text-card-text '>
              {rss.selected ? (
                <SubscriptionDialog rssId={rss.id} type='delete' onSubscriptionChange={handleSubscriptionChange}>
                  <Icons.subscribed
                    size={30}
                    className='bg-[#D8D8D8] dark:bg-[#383636] hover:bg-[#D8D8D8] dark:hover:bg-[#383636] rounded-md p-1'
                  />
                </SubscriptionDialog>
              ) : (
                <SubscriptionDialog rssId={rss.id} type='add' onSubscriptionChange={handleSubscriptionChange}>
                  <Icons.unSubScribed size={30} className='hover:bg-[#D8D8D8] dark:hover:bg-[#383636] rounded-md p-1' />
                </SubscriptionDialog>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
