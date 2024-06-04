import type { CreateTagsDto, TagsResponse, UpdateTagsDto } from '@/types/tags'
import { request } from './request'

export const createTagsReq = (data: CreateTagsDto): Promise<TagsResponse> => {
  return request.post('/tags/new', {
    ...data
  })
}

export const getAllTagsReq = (): Promise<TagsResponse[]> => {
  return request.get('/tags/all')
}

export const updateTagsReq = (data: UpdateTagsDto) => {
  return request.patch('/tags/update', {
    ...data
  })
}
