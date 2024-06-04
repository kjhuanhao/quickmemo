import { withRef } from '@udecode/cn'
import { Icons } from '@/components/CustomIcons'
import { ToolbarButton } from './toolbar'
import { useImageContext } from '@/context/ImageContext'
import React, { useRef } from 'react'

export const ImageToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const { addImages } = useImageContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      addImages(Array.from(files))
    }
  }

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        className='hidden'
        id='upload-button'
        ref={inputRef}
      />
      <ToolbarButton ref={ref} {...rest} onClick={handleButtonClick}>
        <Icons.image />
      </ToolbarButton>
    </div>
  )
})
