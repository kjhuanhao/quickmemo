import { createPluginFactory, removeNodes } from '@udecode/plate-common'

import type { TAGPlugin } from './types'

import { mentionOnKeyDownHandler } from './handlers/mentionOnKeyDownHandler'
import { isSelectionInMentionInput } from './queries/index'
import { withMention } from './withMention'

export const ELEMENT_TAG = 'tag'

export const ELEMENT_TAG_INPUT = 'tag_input'

/** Enables support for autocompleting @mentions. */
export const createTagPlugin = createPluginFactory<TAGPlugin>({
  handlers: {
    onBlur: editor => () => {
      // remove mention_input nodes from editor on blur
      removeNodes(editor, {
        at: [],
        match: n => n.type === ELEMENT_TAG_INPUT
      })
    },
    onKeyDown: mentionOnKeyDownHandler({ query: isSelectionInMentionInput })
  },
  isElement: true,
  isInline: true,
  isMarkableVoid: true,
  isVoid: true,
  key: ELEMENT_TAG,
  options: {
    createMentionNode: (item: any) => ({ value: item.data }),
    trigger: '#',
    triggerPreviousCharPattern: /^\s?$/
  },
  plugins: [
    {
      isElement: true,
      isInline: true,
      key: ELEMENT_TAG_INPUT
    }
  ],
  then: (editor, { key }) => ({
    options: {
      id: key
    }
  }),
  withOverrides: withMention
})
