import { UploadImageState } from '@/context/uploadContext'
import { MemoModel } from '@/models/memo.entity'

type MemoModelType = typeof MemoModel

export type MemoDto = Omit<MemoModel, 'id' | 'createTime' | 'updateTime'>
