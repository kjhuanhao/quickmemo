import type { TagsEntity, TagsDto } from '@/types/tags'
import Dexie from 'dexie'
import { MemoDataBase } from './memoDataBase'
import { INDEX_DATABASE_NAME } from '@/constants/database'

export class TagsDataBase extends Dexie {
  tags: Dexie.Table<TagsEntity, number>

  private static instance: TagsDataBase

  private constructor() {
    super(INDEX_DATABASE_NAME)
    this.version(1).stores({
      tags: '++id, count, &name'
    })
    this.tags = this.table('tags')
  }

  public static getInstance(): TagsDataBase {
    if (!TagsDataBase.instance) {
      TagsDataBase.instance = new TagsDataBase()
    }
    return TagsDataBase.instance
  }

  // 查询所有的 tags
  async getAllRecords(): Promise<TagsEntity[]> {
    return await this.tags.toArray()
  }

  // 添加 Tag
  async addRecord(tagDto: TagsDto): Promise<void> {
    try {
      await this.tags.add(tagDto)
      console.log('Tag added successfully!')
    } catch (error) {
      console.error('Failed to add tag:', error)
    }
  }

  // 更新 Tag
  async updateRecord(id: number, updatedTag: Partial<TagsDto>): Promise<void> {
    try {
      await this.tags.update(id, updatedTag)
      console.log('Tag updated successfully!')
    } catch (error) {
      console.error('Failed to update tag:', error)
    }
  }

  // 删除 Tag 及相关 Memos
  async deleteTag(id: number): Promise<void> {
    try {
      const tag = await this.tags.get(id)
      if (tag) {
        // 获取 MemoDataBase 实例
        const memoDb = MemoDataBase.getInstance()

        // 查找所有包含该 tag 的 memos
        const memosToDelete = await memoDb.findMemosByTag(tag.name)

        // 删除找到的 memos
        await memoDb.memos.bulkDelete(memosToDelete.map(memo => memo.id!))

        // 删除 tag
        await this.tags.delete(id)
        console.log('Tag and related memos deleted successfully!')
      } else {
        console.log('Tag not found!')
      }
    } catch (error) {
      console.error('Failed to delete tag and related memos:', error)
    }
  }

  // 查询 Tag
  async queryRecord(id: number): Promise<TagsEntity | undefined> {
    try {
      const tag = await this.tags.get(id)
      console.log('Tag retrieved successfully!')
      return tag
    } catch (error) {
      console.error('Failed to retrieve tag:', error)
      return undefined
    }
  }
}
