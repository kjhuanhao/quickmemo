export interface TagsResponse {
  id: string
  count: number
  name: string
  createdBy: string
}

export type TagsEntity = TagsResponse
export type Tags = Omit<TagsEntity, 'createdBy'>

interface CreateTagsDto {
  name: string
}

interface UpdateTagsDto {
  id: string
  name: string
}

interface DeleteTagsDto {
  id: string
}
interface Tag extends TagsEntity {
  children?: Tag[]
}

interface TagNode extends Omit<Tag, 'children'> {
  children?: { [key: string]: TagNode }
}
