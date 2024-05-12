import React, { useState, useCallback } from 'react'
import { cn } from '@udecode/cn'
import { PlateContent } from '@udecode/plate-common'
import { cva } from 'class-variance-authority'
import type { PlateContentProps } from '@udecode/plate-common'
import type { VariantProps } from 'class-variance-authority'
import { ImageList } from './image-list'
import { FixedToolbar } from './fixed-toolbar'
import { FixedToolbarButtons } from './fixed-toolbar-buttons'

const editorVariants = cva(
  cn(
    'relative whitespace-pre-wrap break-words',
    'min-h-[170px] max-h-[450px] w-full rounded-md bg-card py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
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

export type EditorProps = PlateContentProps & VariantProps<typeof editorVariants>

const Editor = React.memo(
  React.forwardRef<HTMLDivElement, EditorProps>(
    ({ className, disabled, focused, focusRing, readOnly, size, variant, ...props }, ref) => {
      const [isFocused, setIsFocused] = useState(false)
      const handleFocus = useCallback(() => {
        setIsFocused(true)
      }, [])

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
            className
          )}
        >
          <PlateContent
            ref={ref}
            className='focus:outline-none mb-1 px-3 max-h-80 overflow-y-auto no-scrollbar'
            disableDefaultStyles={true}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // readOnly={disabled ?? readOnly}
            aria-disabled={disabled}
            {...props}
          />
          <ImageList />

          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>
        </div>
      )
    }
  )
)
Editor.displayName = 'Editor'
export { Editor }
