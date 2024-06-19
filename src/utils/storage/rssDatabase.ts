import { INDEX_DATABASE_NAME } from '@/constants/database'
import Dexie from 'dexie'

export class RssDatabase extends Dexie {
  readItems: Dexie.Table<{ id: string }, string>

  private static instance: RssDatabase
  constructor() {
    super(INDEX_DATABASE_NAME)
    this.version(1).stores({
      readItems: 'id'
    })
    this.readItems = this.table('rssReadItems')
  }

  async markAsRead(itemId: string) {
    await this.readItems.put({ id: itemId })
  }

  async isRead(itemId: string) {
    return await this.readItems.get(itemId)
  }

  public static getInstance(): RssDatabase {
    if (!RssDatabase.instance) {
      RssDatabase.instance = new RssDatabase()
    }
    return RssDatabase.instance
  }
}
