import { MemoModel } from '@/models/memo.entity'
import { MemoDto } from '@/types/memo'
import { v4 as uuidv4 } from 'uuid'

type StorageActionType = 'add' | 'update' | 'delete'

export const handleToDb = (memo: MemoDto, action: StorageActionType): MemoModel => {
  const model = new MemoModel()
  model.updateTime = Date.now().toString()
  model.content = memo.content
  model.imageIdList = memo.imageIdList
  model.tag = memo.tag
  if (action === 'add') {
    model.id = uuidv4()
    return model
  }
  if (action === 'update') {
    return model
  }
  return model
}
