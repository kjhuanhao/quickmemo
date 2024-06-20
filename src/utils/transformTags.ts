import type { Tag, TagNode, TagsEntity } from '@/types/tags'

export const transformTags = (tags: TagsEntity[]): Tag[] => {
  const tagMap: { [key: string]: TagNode } = {}

  tags.forEach(tag => {
    const parts = tag.name.split('/')
    let currentLevel = tagMap
    let path = ''

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          id: tag.id,
          name: part,
          count: tag.count,
          createdBy: tag.createdBy,
          children: {},
          path: '' // Initialize path
        }
      }

      if (index === 0) {
        path = part
      } else {
        path += '/' + part
      }

      currentLevel[part].path = path // Update path

      if (index === parts.length - 1) {
        currentLevel[part].id = tag.id
        currentLevel[part].count = tag.count
        currentLevel[part].createdBy = tag.createdBy
      }

      currentLevel = currentLevel[part].children!
    })
  })

  const buildTree = (obj: { [key: string]: TagNode }): Tag[] => {
    return Object.values(obj).map(tagNode => {
      const tag: Tag = {
        id: tagNode.id,
        name: tagNode.name,
        count: tagNode.count,
        createdBy: tagNode.createdBy,
        path: tagNode.path, // Include path in the final Tag object
        children: tagNode.children ? buildTree(tagNode.children) : undefined
      }
      return tag
    })
  }

  return buildTree(tagMap)
}
