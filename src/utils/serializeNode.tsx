import type { LinkNode, MemoContent, TextNode, ElementNode } from '@/types/memo'

// 类型守卫函数
function isTextNode(node: any): node is TextNode {
  return (node as TextNode).text !== undefined
}

function isLinkNode(node: any): node is LinkNode {
  return (node as LinkNode).type === 'a'
}

function isElementNode(node: any): node is ElementNode {
  return (node as ElementNode).type !== undefined && (node as ElementNode).children !== undefined
}

// 序列化节点
export function serializeNode(node: TextNode | ElementNode | LinkNode): string {
  if (isTextNode(node)) {
    let text = node.text
    if (node.underline) text = `<u>${text}</u>`
    if (node.italic) text = `<i>${text}</i>`
    if (node.bold) text = `<b>${text}</b>`
    if (node.highlight) text = `<mark>${text}</mark>`
    return text
  }

  if (isLinkNode(node)) {
    const childrenHTML = node.children.map(serializeNode).join('')
    return `<a href="${node.url}">${childrenHTML}</a>`
  }

  if (isElementNode(node)) {
    const childrenHTML = node.children.map(serializeNode).join('')
    switch (node.type) {
      case 'p':
        return `<p>${childrenHTML}</p>`
      case 'code_block':
        return `<pre><code>${childrenHTML}</code></pre>`
      case 'code_line':
        return `${childrenHTML}\n`
      case 'ol':
        return `<ol>${childrenHTML}</ol>`
      case 'li':
        return `<li>${childrenHTML}</li>`
      case 'lic':
        return `${childrenHTML}`
      default:
        return childrenHTML
    }
  }

  return ''
}

// 序列化整个数据
export function serialize(data: MemoContent[]): string {
  return data.map(serializeNode).join('')
}

// 反序列化节点
function deserializeNode(element: Element): TextNode | ElementNode | LinkNode {
  const tagName = element.tagName.toLowerCase()

  if (tagName === 'a') {
    const linkNode: LinkNode = {
      type: 'a',
      url: element.getAttribute('href') || '',
      children: Array.from(element.childNodes).map(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return { text: node.textContent || '' } as TextNode
        } else {
          return deserializeNode(node as Element) as TextNode
        }
      })
    }
    return linkNode
  }

  if (tagName === 'p' || tagName === 'ol' || tagName === 'li') {
    const type = tagName
    const children = Array.from(element.childNodes).map(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return { text: node.textContent || '' } as TextNode
      } else {
        return deserializeNode(node as Element)
      }
    })

    return { type: type as ElementNode['type'], children } as ElementNode
  }

  if (tagName === 'pre') {
    const codeBlockNode: ElementNode = {
      type: 'code_block',
      children: []
    }

    const codeElement = element.querySelector('code')
    if (codeElement) {
      const lines = codeElement.innerHTML.split('\n')
      for (const line of lines) {
        const codeLineNode: ElementNode = {
          type: 'code_line',
          children: [{ text: line }]
        }
        codeBlockNode.children.push(codeLineNode)
      }
    }

    return codeBlockNode
  }

  if (element.nodeType === Node.TEXT_NODE) {
    return { text: element.textContent || '' } as TextNode
  }

  // Handle text formatting
  const textNode: TextNode = { text: element.textContent || '' }
  if (tagName === 'u') textNode.underline = true
  if (tagName === 'i') textNode.italic = true
  if (tagName === 'b') textNode.bold = true
  if (tagName === 'mark') textNode.highlight = true

  return textNode
}

// 反序列化 HTML 字符串
export function deserialize(html: string): MemoContent[] {
  const template = document.createElement('template')
  template.innerHTML = html

  return Array.from(template.content.childNodes).map(node => deserializeNode(node as Element)) as MemoContent[]
}
