export interface TagsResponse {
  id: number
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
