import type { MemoDto, MemoEntity } from '@/types/memo'
import { request } from './request'

export const createMemosReq = (data: MemoDto): Promise<MemoEntity> => {
  return request.post('/memos/new', { ...data })
}

export const getAllMemosReq = (): Promise<MemoEntity[]> => {
  return request.get('/memos/all')
}
