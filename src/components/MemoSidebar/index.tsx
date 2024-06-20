import { cn } from '@/lib/utils'
import { MemoHeatMap } from '../MemoHeatMap'
import { Icons } from '../CustomIcons'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { ROUTE_KEY } from '@/router'
import { useGoTo } from '@/hooks/navigate'
import { menuVariant } from '@/constants/variant'
import { useSearchParams } from 'react-router-dom'
import { useTagsContext } from '@/context/TagsContext'
import { TagItem } from './tagItem'
import { useMemosContext } from '@/context/MemosContext'

interface MemoSidebarProps {
  className?: string
}

const MemoSidebar: React.FC<MemoSidebarProps> = ({ className }) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>('全部笔记')
  const { go } = useGoTo()
  const searchParams = useSearchParams()
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)
  const { tags, fetchTags } = useTagsContext()
  const { fetchMemos } = useMemosContext()

  useEffect(() => {
    if (searchParams[0].size >= 1) {
      setSelectedMenu(null)
    }
    console.log(searchParams)
  }, [searchParams])
  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu)
    setSelectedTagId(null)
    if (menu === '全部笔记') {
      go(ROUTE_KEY.MEMO)
      fetchMemos(1)
    }
    if (menu === '随机漫游') go(ROUTE_KEY.RSS_ALL)
  }

  const handleSelect = (id: string) => {
    setSelectedTagId(id)
  }
  return (
    <div className={cn('flex my-0 mx-auto w-full p-5 bg-secondSidebar-background', className)}>
      <div className='flex flex-col w-full'>
        <div className='flex justify-center w-full'>
          <MemoHeatMap />
        </div>
        <div className='space-y-4 mt-4'>
          <Button
            className={menuVariant({ selected: selectedMenu === '全部笔记' })}
            isMenu={true}
            onClick={() => handleMenuSelect('全部笔记')}
          >
            <Icons.all size={20} />
            <span>全部笔记</span>
          </Button>
          <Button
            className={menuVariant({ selected: selectedMenu === '随机漫游' })}
            isMenu={true}
            onClick={() => handleMenuSelect('随机漫游')}
          >
            <Icons.random size={20} />
            <span>随机漫游</span>
          </Button>
        </div>
        <div className='p-1 mt-2'>
          <h2 className='text-lg font-semibold text-sidebar-text mb-3'>全部标签</h2>
          {tags.map(tag => (
            <TagItem key={tag.id} tag={tag} selectedTagId={selectedTagId} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default MemoSidebar
