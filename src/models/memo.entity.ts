import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('memo')
export class MemoModel {
  @PrimaryColumn('uuid')
  id!: string

  @Column({ type: 'simple-json', nullable: false, comment: 'memo 的内容' })
  content: any

  @Column({ type: 'simple-array', nullable: true, comment: 'memo 的标签' })
  tag: string[] = []

  @Column({ type: 'simple-array', nullable: true, comment: 'memo 的创建者' })
  imageIdList: string[] = []

  @Column({ type: 'varchar', nullable: false, comment: 'memo 的创建时间戳' })
  createTime: string = Date.now().toString()

  @Column({ type: 'varchar', nullable: false, comment: 'memo 的更新时间戳' })
  updateTime: string = ''
}
