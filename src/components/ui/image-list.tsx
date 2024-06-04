import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { Icons } from '@/components/CustomIcons'
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui'
import { cn } from '@udecode/cn'
import { useDropzone } from 'react-dropzone'
import { useImageContext } from '@/context/ImageContext'

interface ImageUploadProps {
  className?: string
}

export const ImageList: React.FC<ImageUploadProps> = ({ className }) => {
  const { images, addImages, removeImage } = useImageContext()

  const onDrop = (acceptedFiles: File[]) => {
    addImages(acceptedFiles)
  }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
    noClick: true
  })

  return (
    <div className={cn('flex flex-row px-3 z-20 w-full gap-2 overflow-auto', className)}>
      <div {...getRootProps()} className='w-screen'>
        <input {...getInputProps()} />
        {/* <p>拖拽图片到这里，或点击上传</p> */}
        {images.length > 0 && (
          <div className='flex flex-row gap-3'>
            <PhotoProvider
              overlayRender={props => (
                <>
                  <SlideToolbar {...props} items={['arrowLeft', 'countText', 'arrowRight']} />
                  <CloseButton onClick={props.onClose} />
                </>
              )}
            >
              <div className='flex flex-row gap-3'>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <PhotoView src={image.url ? image.url : URL.createObjectURL(image.file)}>
                      <img
                        className='w-16 h-16 rounded-md cursor-pointer object-cover'
                        src={image.url ? image.url : URL.createObjectURL(image.file)}
                        alt={`preview-${index}`}
                      />
                    </PhotoView>
                    <div
                      className='absolute rounded-full bg-slate-600 right-1 top-1 p-[2px] cursor-pointer'
                      onClick={() => removeImage(index)}
                    >
                      <Icons.close color='#cacdce' className='h-3 w-3' />
                    </div>
                    {image.progress < 100 && (
                      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='w-1/2 bg-gray-200 rounded-full'>
                          <div
                            className='bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                            style={{ width: `${image.progress}%` }}
                          >
                            {image.progress}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PhotoProvider>
            <div
              className='w-16 h-16 border-dashed rounded-md border border-slate-500 bg-accent relative cursor-pointer'
              onClick={open}
            >
              <Icons.add className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
