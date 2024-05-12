import { type FindNodeOptions, type PlateEditor, type Value, findNode, getPluginType } from '@udecode/plate-common'

import type { TMentionInputElement } from '../types'

import { ELEMENT_TAG_INPUT } from '../createTagPlugin'

export const findMentionInput = <V extends Value>(
  editor: PlateEditor<V>,
  options?: Omit<FindNodeOptions<V>, 'match'>
) =>
  findNode<TMentionInputElement>(editor, {
    ...options,
    match: { type: getPluginType(editor, ELEMENT_TAG_INPUT) }
  })
