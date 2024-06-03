import React, { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@udecode/cn'
import { PlateContent } from '@udecode/plate-common'
import { cva } from 'class-variance-authority'
import type { PlateContentProps } from '@udecode/plate-common'
import type { VariantProps } from 'class-variance-authority'
import { ImageList } from './image-list'
import { FixedToolbar } from './fixed-toolbar'
import { FixedToolbarButtons } from './fixed-toolbar-buttons'
import { SelectedTagsList } from './selected-tags-list'
import { useTags } from '@/hooks/useTags'

const editorVariants = cva(
  cn(
    'whitespace-pre-wrap break-words',
    'min-h-[180px] max-h-[620px] w-full rounded-md bg-card text-sm ring-offset-background placeholder:text-muted-foreground',
    '[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100',
    '[&_[data-slate-placeholder]]:top-[auto_!important]',
    '[&_strong]:font-bold'
  ),
  {
    variants: {
      variant: {
        outline: 'border border-input focus:border-primary',
        ghost: ''
      },
      focused: {
        true: 'ring-2 ring-primary ring-offset-0 shadow-lg'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50'
      },
      focusRing: {
        true: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus:shadow-lg',
        false: ''
      },
      size: {
        sm: 'text-sm',
        md: 'text-base'
      }
    },
    defaultVariants: {
      variant: 'outline',
      focusRing: true,
      size: 'sm'
    }
  }
)
const imageListVariants = cva(cn('px-3 mt-2'), {
  variants: {
    bottomWithTags: {
      true: 'mb-4',
      false: 'mb-14'
    }
  },
  defaultVariants: {
    bottomWithTags: false
  }
})
export type EditorProps = PlateContentProps & VariantProps<typeof editorVariants>

const Editor = React.memo(
  React.forwardRef<HTMLDivElement, EditorProps>(
    ({ className, disabled, focused, focusRing, readOnly, size, variant, ...props }, ref) => {
      const [isFocused, setIsFocused] = useState(false)
      const handleFocus = useCallback(() => {
        setIsFocused(true)
      }, [])

      const { selectedTags, setSelectedTags } = useTags()

      const handleBlur = useCallback(() => {
        setIsFocused(false)
      }, [])

      return (
        <div
          className={cn(
            editorVariants({
              disabled,
              focused: isFocused,
              focusRing,
              size,
              variant
            }),
            className,
            'relative py-2'
          )}
        >
          <div className=''>
            <PlateContent
              ref={ref}
              className='focus:outline-none mb-1 px-3 max-h-[350px] overflow-y-auto scrollbar-transparent'
              disableDefaultStyles={true}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-disabled={disabled}
              {...props}
            />
          </div>
          <div>
            <ImageList className={imageListVariants({ bottomWithTags: selectedTags.length > 0 })} />
            {(selectedTags.length > 0 && (
              <SelectedTagsList
                tags={selectedTags}
                setTags={setSelectedTags}
                isCancelable={true}
                className='bg-card px-3 mb-10'
              />
            )) ||
              null}
          </div>
          <FixedToolbar className='absolute bottom-0 left-0 right-0'>
            <FixedToolbarButtons />
          </FixedToolbar>
        </div>
      )
    }
  )
)
Editor.displayName = 'Editor'
export { Editor }
