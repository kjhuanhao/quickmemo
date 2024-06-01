import { INDEX_DATABASE_NAME } from '@/constants/database'
import type { MemoEntity } from '@/types/memo'
import Dexie from 'dexie'

export class MemoDataBase extends Dexie {
  memos: Dexie.Table<MemoEntity, string>

  private static instance: MemoDataBase

  private constructor() {
    super(INDEX_DATABASE_NAME)
    this.version(1).stores({
      memos: '&id, content, tag, imageIdList, createTime, updateTime'
    })
    this.memos = this.table('memos')
  }

  public static getInstance(): MemoDataBase {
    if (!MemoDataBase.instance) {
      MemoDataBase.instance = new MemoDataBase()
    }
    return MemoDataBase.instance
  }

  // 查询所有的 memo
  async getAllRecords(): Promise<MemoEntity[]> {
    return await this.memos.toArray()
  }

  // 添加 Memo
  async addRecord(memo: MemoEntity): Promise<void> {
    try {
      await this.memos.add(memo)
      console.log('Memo added successfully!')
    } catch (error) {
      console.error('Failed to add memo:', error)
    }
  }

  // 更新 Memo
  async updateRecord(id: string, updatedMemo: Partial<MemoEntity>): Promise<void> {
    try {
      await this.memos.update(id, updatedMemo)
      console.log('Memo updated successfully!')
    } catch (error) {
      console.error('Failed to update memo:', error)
    }
  }

  // 删除 Memo
  async deleteRecord(id: string): Promise<void> {
    try {
      await this.memos.delete(id)
      console.log('Memo deleted successfully!')
    } catch (error) {
      console.error('Failed to delete memo:', error)
    }
  }

  // 查询 Memo
  async queryRecord(id: string): Promise<MemoEntity | undefined> {
    try {
      const memo = await this.memos.get(id)
      console.log('Memo retrieved successfully!')
      return memo
    } catch (error) {
      console.error('Failed to retrieve memo:', error)
      return undefined
    }
  }

  // 查找所有包含指定 tag 的 memos
  async findMemosByTag(tag: string): Promise<MemoEntity[]> {
    try {
      const memos = await this.memos.where('tag').equals(tag).toArray()
      console.log(`Memos with tag "${tag}" retrieved successfully!`)
      return memos
    } catch (error) {
      console.error(`Failed to retrieve memos with tag "${tag}":`, error)
      return []
    }
  }
}
