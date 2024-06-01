import { withProps } from '@udecode/cn'
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createCodePlugin,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT
} from '@udecode/plate-basic-marks'
import { createPlugins, PlateElement, PlateLeaf, RenderAfterEditable } from '@udecode/plate-common'
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock
} from '@udecode/plate-code-block'
import {
  createListPlugin,
  ELEMENT_OL,
  ELEMENT_LI,
  ELEMENT_UL,
  createTodoListPlugin,
  ELEMENT_TODO_LI
} from '@udecode/plate-list'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import { createComboboxPlugin } from '@udecode/plate-combobox'
import { createMentionPlugin, ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from '@udecode/plate-mention'
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/plate-media'
import { createSelectOnBackspacePlugin } from '@udecode/plate-select'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createExitBreakPlugin } from '@udecode/plate-break'
import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight'
// import { createTagPlugin, ELEMENT_TAG, ELEMENT_TAG_INPUT } from '@/lib/plugins/tagPlugin'
// import { createTagPlugin, ELEMENT_TAG } from '@/lib/plugins/testPlugin'

import { ParagraphElement } from '@/components/ui/paragraph-element'
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { CodeBlockElement } from '@/components/ui/code-block-element'
import { CodeLineElement } from '@/components/ui/code-line-element'
import { CodeSyntaxLeaf } from '@/components/ui/code-syntax-leaf'
import { ListElement } from '@/components/ui/list-element'
import { LinkElement } from '@/components/ui/link-element'
import { MentionElement } from '@/components/ui/mention-element'
import { MentionInputElement } from '@/components/ui/mention-input-element'
import { LinkFloatingToolbar } from '@/components/ui/link-floating-toolbar'
import { TodoListElement } from '@/components/ui/todo-list-element'
import { HighlightLeaf } from '@/components/ui/highlight-leaf'
import { autoformatBlocks } from '@/lib/autoFormateRules/autoformatBlocks'
import { autoformatLists } from '@/lib/autoFormateRules/autoformatLists'

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock
}
export const autoformatRules = [...autoformatBlocks, ...autoformatLists]

export const plugins = createPlugins(
  [
    // Marks
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    // createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createCodeBlockPlugin(),
    createTodoListPlugin(),
    // createCodePlugin(),
    // createBlockquotePlugin(),

    // other
    createParagraphPlugin(),
    createListPlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable
    }),
    // createMentionPlugin({
    //  options: {
    //    trigger: '#',
    //  }
    // }),
    createComboboxPlugin(),
    createImagePlugin(),
    createHighlightPlugin(),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE]
        }
      }
    }),
    createResetNodePlugin({
      options: {
        rules: [
          // {
          //   ...resetBlockTypesCommonRule,
          //   hotkey: 'Enter',
          //   predicate: isBlockAboveEmpty
          // },
          // {
          //   ...resetBlockTypesCommonRule,
          //   hotkey: 'Backspace',
          //   predicate: isSelectionAtBlockStart
          // },
          // {
          //   ...resetBlockTypesCodeBlockRule,
          //   hotkey: 'Enter',
          //   predicate: isCodeBlockEmpty
          // },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtCodeBlockStart
          }
        ]
      }
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter'
          },
          {
            hotkey: 'mod+shift+enter',
            before: true
          }
        ]
      }
    }),
    createAutoformatPlugin({
      enabled: true,
      options: {
        rules: [...autoformatRules],
        enableUndoOnDelete: true
      }
    })
  ],
  {
    components: {
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      // [MARK_CODE]: CodeLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      // [MARK_KBD]: KbdLeaf,
      // [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      // [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
      [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
      [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
      [ELEMENT_TODO_LI]: TodoListElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_MENTION]: MentionElement,
      [ELEMENT_MENTION_INPUT]: MentionInputElement,
      // [ELEMENT_TAG_INPUT]: MentionInputElement,
      [MARK_HIGHLIGHT]: HighlightLeaf
    }
  }
)
