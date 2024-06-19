import type { Tag, TagNode } from '@/types/tags'

export const transformTags = (tags: Tag[]): Tag[] => {
  const tagMap: { [key: string]: TagNode } = {}

  tags.forEach(tag => {
    const parts = tag.name.split('/')
    let currentLevel = tagMap

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          id: tag.id,
          name: part,
          count: tag.count,
          createdBy: tag.createdBy,
          children: {}
        }
      }

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
        children: tagNode.children ? buildTree(tagNode.children) : undefined
      }
      return tag
    })
  }

  return buildTree(tagMap)
}
