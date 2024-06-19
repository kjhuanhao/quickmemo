import React, { useState } from 'react'
import { Icons } from '../CustomIcons'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { RssSidebarDialog, type ActionType } from './rssSidebarDialog'
import { RssMorePopover } from './rssMorePopover'

interface GroupRendererProps {
  group: RssGroup
  subscriptions: RssSubscription[]
  selectedGroup: string | undefined
  selectedRssId: string | undefined
  expandedGroups: { [key: string]: boolean }
  handleGroupToggle: (group: string) => void
  handleGroupSelect: (group: string) => void
  setSelectedRssId: (rssId: string | undefined) => void
  setSelectedGroup: (group: string | undefined) => void
  setSelectedMenu: (menu: string) => void
  go: (routeKey: string, params?: any) => void
  ROUTE_KEY: { [key: string]: string }
}

const itemVariant = cva('flex flex-col justify-between p-1 mb-1 cursor-pointer rounded-md', {
  variants: {
    selected: {
      true: 'bg-sidebar-hover',
      false: 'hover:bg-sidebar-hover bg-transparent text-text'
    }
  },
  defaultVariants: {
    selected: false
  }
})

const groupVariant = cva('cursor-pointer p-1 mb-1 rounded-md flex items-center text-sidebar-text', {
  variants: {
    selected: {
      true: 'bg-sidebar-hover ',
      false: 'hover:bg-sidebar-hover bg-transparent '
    }
  },
  defaultVariants: {
    selected: false
  }
})

export const GroupItem: React.FC<GroupRendererProps> = ({
  group,
  subscriptions,
  selectedGroup,
  selectedRssId,
  expandedGroups,
  handleGroupToggle,
  handleGroupSelect,
  setSelectedRssId,
  setSelectedGroup,
  setSelectedMenu,
  go,
  ROUTE_KEY
}) => {
  const groupName = group.name
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<ActionType>(null)
  const [unlinkRssId, setUnlinkRssId] = useState<string>()
  const handleDialogOpen = (type: ActionType) => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleGroupClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleGroupSelect(groupName)
    }
  }

  return (
    <div key={group.id} className='mb-2'>
      <div className={groupVariant({ selected: selectedGroup === groupName })} onClick={handleGroupClick}>
        <div
          onClick={e => {
            e.stopPropagation()
            handleGroupToggle(groupName)
          }}
        >
          {expandedGroups[groupName] ? <Icons.arrowDown size={20} /> : <Icons.arrowRight size={20} />}
        </div>
        <span className='ml-2'>{groupName}</span>
        {groupName !== '全部' && groupName !== '未分组' && (
          <>
            <RssMorePopover onEdit={() => handleDialogOpen('update')} onDelete={() => handleDialogOpen('delete')} />

            {isDialogOpen && (
              <RssSidebarDialog
                type={dialogType}
                name={group.name}
                rssId={unlinkRssId}
                groupId={group.id}
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
              />
            )}
          </>
        )}
      </div>
      {expandedGroups[groupName] && (
        <div className='ml-2'>
          {subscriptions.map(sub => (
            <div
              key={sub.id}
              className={cn('ml-2', itemVariant({ selected: selectedRssId === sub.rssId }))}
              onClick={() => {
                setSelectedRssId(sub.rssId)
                setSelectedGroup(undefined)
                setSelectedMenu(groupName)
                go(ROUTE_KEY.RSS_SUBSCRIPTION, { rssId: sub.rssId })
              }}
            >
              <div className='flex flex-row items-center'>
                <img src={sub.icon} alt='' className='w-5 h-5 rounded-full' />
                <span className='ml-2 line-clamp-1'>{sub.name}</span>
                {/*  修改某个订阅的分组 */}
                <RssMorePopover
                  onEdit={() => handleDialogOpen('change')}
                  onDelete={() => handleDialogOpen('unlink')}
                  onClick={() => setUnlinkRssId(sub.rssId)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
