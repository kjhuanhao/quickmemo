import { INDEX_DATABASE_NAME } from '@/constants/database'
import type { MemoEntity } from '@/types/memo'
import Dexie from 'dexie'

export class MemoDataBase extends Dexie {
  memos: Dexie.Table<MemoEntity, string>

  private static instance: MemoDataBase

  private constructor() {
    super(INDEX_DATABASE_NAME)
    this.version(1).stores({
      memos: '&id, content, *tags, images, createdTime, updatedTime'
    })
    this.memos = this.table('memos')
  }

  public static getInstance(): MemoDataBase {
    if (!MemoDataBase.instance) {
      MemoDataBase.instance = new MemoDataBase()
    }
    return MemoDataBase.instance
  }

  // 查询所有的 memo，按 createdTime 排序
  async getAllRecords(): Promise<MemoEntity[]> {
    return await this.memos.orderBy('createdTime').reverse().toArray()
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
  async findMemosByTag(tag: string, page: number = 1, pageSize: number = 10): Promise<MemoEntity[]> {
    try {
      const offset = (page - 1) * pageSize
      const memos = await this.memos.where('tags').anyOf([tag]).offset(offset).limit(pageSize).toArray()
      console.log(`Found ${memos.length} memos with tag "${tag}" for page ${page}!`)
      return memos
    } catch (error) {
      console.error(`Failed to retrieve memos with tag "${tag}" for page ${page}:`, error)
      return []
    }
  }
  async deleteAllMemos() {
    try {
      await this.memos.clear()
      console.log('All memos deleted successfully!')
    } catch (error) {
      console.error('Failed to delete all memos:', error)
    }
  }

  // 分页查询 Memo
  async getRecordsByPage(page: number, pageSize: number): Promise<MemoEntity[]> {
    try {
      const offset = (page - 1) * pageSize
      const memos = await this.memos.orderBy('createdTime').reverse().offset(offset).limit(pageSize).toArray()
      console.log(`Memos retrieved successfully for page ${page}!`)
      return memos
    } catch (error) {
      console.error(`Failed to retrieve memos for page ${page}:`, error)
      return []
    }
  }
}
