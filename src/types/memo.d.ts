import { UploadImageState } from '@/context/uploadContext'
import type { Tags } from './tags'

export interface MemoEntity {
  id: string

  content: string

  tag: string[]

  imageIdList: string[]

  createTime: string

  updateTime: string
}

export type MemoDto = Omit<MemoEntity, 'id' | 'createTime' | 'updateTime'>

// 定义文本节点的接口
interface TextNode {
  text: string
  underline?: boolean
  italic?: boolean
  bold?: boolean
  highlight?: boolean
}

// 定义链接节点的接口
interface LinkNode {
  type: 'a'
  url: string
  children: TextNode[]
}

// 定义其他元素节点的接口
interface ElementNode {
  type: 'p' | 'code_block' | 'code_line' | 'ol' | 'li' | 'lic'
  children: Array<TextNode | ElementNode | LinkNode>
}

// 定义根节点的接口
type MemoContent = ElementNode
