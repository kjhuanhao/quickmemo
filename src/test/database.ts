import Database from 'better-sqlite3'
import { DataSource, Repository } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions.js'
import path from 'path'
import { MemoModel } from '@/models/memo.entity'

export const createDateBase = () => {
  const dbPath = path.join(path.dirname(__dirname), '..', 'foobar.db')
  const db = new Database(dbPath, { verbose: console.log })
  db.exec(`
  CREATE TABLE IF NOT EXISTS memo (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    createTime TEXT NOT NULL,
    updateTime TEXT NOT NULL,
    FOREIGN KEY(id) REFERENCES user(id)
  );
`)

  db.close()
  console.log('db', db)
}

export class DataBase {
  dataSource: DataSource

  constructor() {
    const basePath = path.join(path.dirname(__dirname), '..', 'foobar.db')
    console.log(basePath)

    const options: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      entities: [MemoModel],
      database: basePath,
      synchronize: true
    }
    this.dataSource = new DataSource(options)
  }
  // 初始化数据库连接
  async initialize() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize()
    }
  }
  // 获取 MemoModel 的 Repository
  async getMemoRepository(): Promise<Repository<MemoModel>> {
    await this.initialize()
    return this.dataSource.getRepository(MemoModel)
  }

  async createMemo(memo: Partial<MemoModel>): Promise<MemoModel> {
    const repository = await this.getMemoRepository()
    const newMemo = repository.create(memo)
    return repository.save(newMemo)
  }
}
