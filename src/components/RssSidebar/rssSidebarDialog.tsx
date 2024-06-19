import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  changeRssSubscriptionGroupReq,
  createRssSubscriptionSGroupReq,
  deleteRssSubscriptionGroupReq,
  subscribeReq,
  updateRssSubscriptionGroupReq
} from '@/api/rss'
import { errorToast, successToast } from '@/utils'
import { Input } from '../ui/input'
import { useRssContext } from '@/context/RssContext'

export type ActionType = 'add' | 'delete' | 'update' | 'change' | 'unlink' | null

interface RssSidebarDialogProps {
  type: ActionType
  name: string
  groupId?: string
  rssId?: string
  children?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const dialogTitleMap: Record<string, string> = {
  add: '添加分组',
  delete: '删除分组',
  update: '修改分组',
  change: '修改订阅分组',
  unlink: '取消订阅'
}

export const RssSidebarDialog: React.FC<RssSidebarDialogProps> = ({
  type,
  name,
  groupId,
  rssId,
  isOpen,
  onClose = () => {},
  children
}) => {
  const [groupName, setGroupName] = useState<string>(name)
  const { groups, refreshSubscriptions } = useRssContext()
  const [selectedGroupId, setSelectedGroupId] = useState(groupName)

  const handleValueChange = (value: string) => {
    setSelectedGroupId(value)
  }
  const handleApiRequest = async (type: ActionType, groupName: string, groupId?: string, rssId?: string) => {
    switch (type) {
      case 'add':
        if (!groupName) {
          errorToast('分组名不能为空')
          break
        }
        await createRssSubscriptionSGroupReq({ name: groupName.trim() })
        successToast('添加成功')
        break
      case 'delete':
        if (groupId) {
          await deleteRssSubscriptionGroupReq({ groupId })
          successToast('删除成功')
        }
        break
      case 'update':
        if (groupId) {
          await updateRssSubscriptionGroupReq({ id: groupId, name: groupName.trim() })
          successToast('修改成功')
        }
        break
      case 'change':
        if (!selectedGroupId) {
          errorToast('请选择分组')
        }
        if (rssId && groupId) {
          await changeRssSubscriptionGroupReq({ rssId, groupId: selectedGroupId })
          successToast('修改成功')
        }
        break
      case 'unlink':
        if (rssId) {
          await subscribeReq({ rssId, type: 'delete' })
          successToast('取消订阅成功')
        }
        break
      default:
        break
    }
    // 刷新分组
    refreshSubscriptions()
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {children ? (
        <AlertDialogTrigger className='w-full'>{children}</AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger asChild>
          <button style={{ display: 'none' }} />
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{type && dialogTitleMap[type]}</AlertDialogTitle>
          <AlertDialogDescription>
            {type === 'delete' ? (
              <span>
                该分组下的所有订阅源将会处于未分组状态，不会被取消订阅，你确定要删除该分组吗？此操作不可撤销。
              </span>
            ) : type === 'change' ? (
              // <Input placeholder='请输入新分组名' value={groupName} onChange={e => setGroupName(e.target.value)} />
              <Select onValueChange={handleValueChange} defaultValue={groupId}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='选择更新后的分组' />
                </SelectTrigger>
                <SelectContent>
                  {groups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'unlink' ? (
              <span>想好了吗？你将失去这个信息源</span>
            ) : (
              <Input defaultValue={name} onChange={e => setGroupName(e.target.value)} />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleApiRequest(type, groupName, groupId, rssId)
              onClose()
            }}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
