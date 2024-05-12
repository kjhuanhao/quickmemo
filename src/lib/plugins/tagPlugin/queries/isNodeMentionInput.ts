import { type PlateEditor, type TNode, type Value, getPluginType } from '@udecode/plate-common'

import type { TMentionInputElement } from '../types'

import { ELEMENT_TAG_INPUT } from '../createTagPlugin'

export const isNodeMentionInput = <V extends Value>(
  editor: PlateEditor<V>,
  node: TNode
): node is TMentionInputElement => {
  return node.type === getPluginType(editor, ELEMENT_TAG_INPUT)
}
