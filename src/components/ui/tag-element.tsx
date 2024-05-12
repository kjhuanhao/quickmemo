import { PlateRenderElementProps } from '@udecode/plate-common'

export const TagElement = ({ attributes, nodeProps, children }: PlateRenderElementProps) => {
  return (
    <p {...attributes} {...nodeProps}>
      {children}
    </p>
  )
}
