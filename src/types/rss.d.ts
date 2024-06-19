interface RssResponse {
  id: string
  name: string
  description: string
  url: string
  icon: string
  type: string
  selected: boolean
}

type Rss = RssResponse

interface RssSubscription {
  id: string
  rssId: string
  group: string
  icon: string
  name: string
}

type RssSubscriptionResponse = RssSubscription

interface SubscriptionDto {
  rssId: string
  type: 'update' | 'add' | 'delete'
  group?: string
}

interface CreateRssSGroupDto {
  name: string
}

interface UpdateRssGroupDto {
  id: string
  name: string
}

interface UpdateRssSubscriptionGroupDto {
  rssId: string
  groupId: string
}

interface DeleteRssSubscriptionGroupDto {
  groupId: string
}

interface RssSubscriptionInfoResponse {
  id: string
  info: any
}

type RssSubscriptionInfo = RssSubscriptionInfoResponse

interface RssGroup {
  id: string
  name: string
}

interface RssItem {
  id: string
  title: string
  description: string
  link: string
  published: number
  created: number
  category: any[] // 类型取决于具体上下文
  enclosures: any[] // 类型取决于具体上下文
  media: object // 类型取决于具体上下文
}

interface RssInfo {
  id: string
  title: string
  url: string
  author: string
  createdTime: string
  syncTime: string
}

type RssInfoResponse = RssInfo[]
