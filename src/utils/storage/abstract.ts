import { MemoModel } from '@/models/memo.entity'
import { MemoDto } from '@/types/memo'

export abstract class StorageStrategy {
  abstract initialize(): Promise<boolean>
  abstract add(memo: MemoDto): Promise<MemoModel>
  abstract update(memo: MemoDto): Promise<void>
  abstract delete(id: number): Promise<void>
}
