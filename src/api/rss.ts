import { request } from './request'

export const getAllRssReq = (): Promise<RssResponse[]> => {
  return request.get('/rss/all')
}

export const subscribeReq = (data: SubscriptionDto): Promise<boolean> => {
  return request.post('/rss/subscription/subscribe', { ...data })
}

export const getAllRssSubscriptionReq = (): Promise<RssSubscriptionResponse[]> => {
  return request.get('/rss/subscription/all')
}

export const getAllRssTypeReq = (): Promise<string[]> => {
  return request.get('/rss/rssType/all')
}

export const getRssSubscriptionByRssIdReq = (rssId: string): Promise<RssInfoResponse> => {
  return request.get('/rss/subscription/info', {
    params: {
      rssId
    }
  })
}

export const getRssSubscriptionByGroupReq = (group: string): Promise<RssInfoResponse> => {
  return request.get('/rss/subscription/group', {
    params: {
      group
    }
  })
}

export const getAllRssGroupReq = (): Promise<RssGroup[]> => {
  return request.get('/rss/subscription/group/all')
}

export const createRssSubscriptionSGroupReq = (data: CreateRssSGroupDto) => {
  return request.post('/rss/subscription/group/new', { ...data })
}

export const updateRssSubscriptionGroupReq = (data: UpdateRssGroupDto) => {
  return request.post('/rss/subscription/group/update', { ...data })
}

export const changeRssSubscriptionGroupReq = (data: UpdateRssSubscriptionGroupDto) => {
  return request.post('/rss/subscription/group/change', { ...data })
}

export const deleteRssSubscriptionGroupReq = (data: DeleteRssSubscriptionGroupDto) => {
  return request.post('/rss/subscription/group/delete', { ...data })
}
