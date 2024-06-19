import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAllRssSubscriptionReq, getAllRssGroupReq } from '@/api/rss'

interface RssContextProps {
  subscriptions: RssSubscription[]
  groups: RssGroup[]
  refreshSubscriptions: () => void
}

const RssContext = createContext<RssContextProps | undefined>(undefined)

export const RssProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<RssSubscription[]>([])
  const [groups, setGroups] = useState<RssGroup[]>([])

  const fetchSubscriptions = async () => {
    const data = await getAllRssSubscriptionReq()
    setSubscriptions(data)
  }

  const fetchGroups = async () => {
    const data = await getAllRssGroupReq()
    setGroups(data)
  }

  useEffect(() => {
    fetchSubscriptions()
    fetchGroups()
  }, [])

  const refreshSubscriptions = () => {
    console.log('refresh subscriptions')
    fetchSubscriptions()
    fetchGroups()
  }

  return <RssContext.Provider value={{ subscriptions, groups, refreshSubscriptions }}>{children}</RssContext.Provider>
}

export const useRssContext = () => {
  const context = useContext(RssContext)
  if (!context) {
    throw new Error('useRss must be used within a RssProvider')
  }
  return context
}
