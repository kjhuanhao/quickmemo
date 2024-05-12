import { createPluginFactory } from '@udecode/plate-common'

export const ELEMENT_TAG = 'tag'

/** Enables support for autocompleting @mentions. */
export const createTagPlugin = createPluginFactory({
  isElement: true,
  isInline: true,
  isMarkableVoid: true,
  isVoid: true,
  key: ELEMENT_TAG
})
