import { subscribeReq } from '@/api/rss'
import React from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '../ui/alert-dialog'
import { promiseToast } from '@/utils'
import { useCallback } from 'react'
import { useRssContext } from '@/context/RssContext'

interface SubscriptionDialogProps {
  children: React.ReactNode
  rssId: string
  type: 'add' | 'delete'
  onSubscriptionChange: (rssId: string, isSubscribed: boolean) => void // 订阅状态改变时的回调
}

export const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  children,
  rssId,
  type,
  onSubscriptionChange
}) => {
  const { subscriptions, refreshSubscriptions } = useRssContext()
  const handleSubscribeButtonClick = useCallback(() => {
    const promise = subscribeReq({ rssId, type }).then(res => {
      if (!res) {
        throw new Error('订阅失败')
      }
      onSubscriptionChange(rssId, type === 'add')
      refreshSubscriptions()
    })
    promiseToast(promise, '执行操作中...', '操作成功', '操作失败')
  }, [rssId, type, onSubscriptionChange])

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你确认要{type === 'add' ? '订阅' : '取消订阅'}吗？</AlertDialogTitle>
          <AlertDialogDescription>
            {type === 'add' ? '订阅后可在信息分组中查看你的订阅详情' : '取消订阅后你将无法在信息分组中查看该订阅的信息'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSubscribeButtonClick()}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
