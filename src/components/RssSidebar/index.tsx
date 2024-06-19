import { cva } from 'class-variance-authority'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { Icons } from '../CustomIcons'
import { cn } from '@/lib/utils'
import { ROUTE_KEY } from '@/router'
import { useGoTo } from '@/hooks/navigate'
import { GroupItem } from './groupItem'
import { RssSidebarDialog } from './rssSidebarDialog'
import { useRssContext } from '@/context/RssContext'

const menuVariant = cva('flex flex-row gap-4 text-lg w-full py-3 px-4 transition-colors duration-200', {
  variants: {
    selected: {
      true: 'bg-primary text-white',
      false: 'hover:bg-sidebar-hover bg-transparent text-sidebar-text'
    }
  },
  defaultVariants: {
    selected: false
  }
})

interface RssSidebarProps {
  className?: string
}

const RssSidebar: React.FC<RssSidebarProps> = ({ className }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('订阅星球')
  const [selectedRssId, setSelectedRssId] = useState<string>()
  const [selectedGroup, setSelectedGroup] = useState<string>()
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({})
  const { go } = useGoTo()
  const { subscriptions, groups } = useRssContext()
  useEffect(() => {
    console.log(12345)
  }, [subscriptions])
  const handleGroupToggle = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group)
    setSelectedRssId(undefined)
    setSelectedMenu(group)
    let routeParam = group
    if (group === '全部') routeParam = 'all'
    else if (group === '未分组') routeParam = 'default'
    go(ROUTE_KEY.RSS_SUBSCRIPTION, { group: routeParam })
  }

  const groupedSubscriptions = subscriptions.reduce(
    (acc, sub) => {
      const group = sub.group || '未分组'
      if (!acc[group]) acc[group] = []
      acc[group].push(sub)
      return acc
    },
    { 全部: subscriptions } as { [key: string]: RssSubscription[] }
  )

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu)
    if (menu === '稍后即读') go(ROUTE_KEY.RSS_READ_LATER)
    if (menu === '订阅星球') go(ROUTE_KEY.RSS_ALL)
  }

  return (
    <div className={cn('flex flex-col h-full w-full p-5 bg-secondSidebar-background', className)}>
      <div className='space-y-4'>
        <Button
          className={menuVariant({ selected: selectedMenu === '订阅星球' })}
          isMenu={true}
          onClick={() => handleMenuSelect('订阅星球')}
        >
          <Icons.subscribe size={20} />
          <span>订阅星球</span>
        </Button>
        <Button
          className={menuVariant({ selected: selectedMenu === '稍后即读' })}
          isMenu={true}
          onClick={() => handleMenuSelect('稍后即读')}
        >
          <Icons.time size={20} />
          <span>稍后即读</span>
        </Button>
      </div>
      <div className='mt-6'>
        <h2 className='text-lg font-semibold text-sidebar-text mb-3'>信息分组</h2>

        <RssSidebarDialog type='add' name=''>
          <div className='w-full h-10 text-sidebar-text rounded-lg hover:bg-sidebar-hover cursor-pointer flex items-center justify-center'>
            添加分组
          </div>
        </RssSidebarDialog>
        <div className='mt-4 space-y-2'>
          <GroupItem
            group={{ id: 'all', name: '全部' }}
            subscriptions={groupedSubscriptions['全部']}
            selectedGroup={selectedGroup}
            selectedRssId={selectedRssId}
            expandedGroups={expandedGroups}
            handleGroupToggle={handleGroupToggle}
            handleGroupSelect={handleGroupSelect}
            setSelectedRssId={setSelectedRssId}
            setSelectedGroup={setSelectedGroup}
            setSelectedMenu={setSelectedMenu}
            go={go}
            ROUTE_KEY={ROUTE_KEY}
          />
          {groups.map(group => (
            <GroupItem
              key={group.id}
              group={group}
              subscriptions={groupedSubscriptions[group.name] || []}
              selectedGroup={selectedGroup}
              selectedRssId={selectedRssId}
              expandedGroups={expandedGroups}
              handleGroupToggle={handleGroupToggle}
              handleGroupSelect={handleGroupSelect}
              setSelectedRssId={setSelectedRssId}
              setSelectedGroup={setSelectedGroup}
              setSelectedMenu={setSelectedMenu}
              go={go}
              ROUTE_KEY={ROUTE_KEY}
            />
          ))}
          {Object.keys(groupedSubscriptions).length === 1 && (
            <div className='text-center text-gray-500'>你还没有订阅的信息源</div>
          )}
        </div>
      </div>
    </div>
  )
}
export default RssSidebar
