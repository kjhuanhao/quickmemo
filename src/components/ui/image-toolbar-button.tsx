import { withRef } from '@udecode/cn'
import { Icons } from '@/components/CustomIcons'
import { ToolbarButton } from './toolbar'
import { UploadImage } from '../UploadImage'

export const ImageToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  return (
    <UploadImage>
      <ToolbarButton ref={ref} {...rest}>
        <Icons.image />
      </ToolbarButton>
    </UploadImage>
  )
})
