import { cva } from 'class-variance-authority'

export const menuVariant = cva('flex flex-row gap-4 text-lg w-full px-4 transition-colors duration-200', {
  variants: {
    selected: {
      true: 'bg-primary text-white',
      false: 'hover:bg-sidebar-hover bg-transparent text-sidebar-text'
    }
  },
  defaultVariants: {
    selected: false
  }
})
