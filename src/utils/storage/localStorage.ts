import { MemoModel } from '@/models/memo.entity'
import { DataSource, Repository } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions.js'
import path from 'path-browserify'
import { StorageStrategy } from './abstract'
import { MemoDto } from '@/types/memo'
import { handleToDb } from './handleToDb'
import { WORKSPACE } from '@/constants/env'

export class LocalStorageUtils extends StorageStrategy {
  private static instance: LocalStorageUtils
  private dataSource: DataSource
  private memoRepository: Repository<MemoModel> | undefined

  private constructor() {
    super()
    const basePath = path.join(WORKSPACE, 'memo.db')
    console.log(basePath)

    const options: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      entities: [MemoModel],
      database: basePath,
      synchronize: true
    }
    this.dataSource = new DataSource(options)
  }

  public static getInstance(): LocalStorageUtils {
    if (!LocalStorageUtils.instance) {
      LocalStorageUtils.instance = new LocalStorageUtils()
    }
    return LocalStorageUtils.instance
  }

  /**
   * 初始化数据库连接
   */
  public async initialize(): Promise<boolean> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize()
      }
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * 获取 memo 仓库
   */
  private async getMemoRepository(): Promise<Repository<MemoModel>> {
    await this.initialize()
    if (!this.memoRepository) {
      this.memoRepository = this.dataSource.getRepository(MemoModel)
    }
    return this.memoRepository
  }

  /**
   * 保存 memo
   */
  public async add(memo: MemoDto): Promise<MemoModel> {
    console.log('add')

    const memoRepository = await this.getMemoRepository()
    const model = handleToDb(memo, 'add')
    try {
      await memoRepository.createQueryBuilder().insert().into(MemoModel).values(model).execute()
      return model
    } catch (error) {
      console.log(error, '创建 memo失败')
      throw new Error()
    }
  }

  /**
   * 更新 memo
   */
  public async update(memo: MemoDto): Promise<void> {
    const memoRepository = await this.getMemoRepository()
    const model = handleToDb(memo, 'update')
    await memoRepository.createQueryBuilder().update(MemoModel).set(model).where('id = :id', { id: model.id }).execute()
  }

  /**
   * 删除 memo
   */
  public async delete(id: number): Promise<void> {
    const memoRepository = await this.getMemoRepository()
    memoRepository.delete(id)
  }
}
