import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { UploadImageContext } from '@/context/uploadContext'
import { UploadImage } from '@/components/UploadImage/'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { Icons } from '@/components/CustomIcons'
import { SlideToolbar, CloseButton } from 'react-image-previewer/ui'

export const ImageList = React.memo(() => {
  const { state, addFile, removeFile, removeAll } = useContext(UploadImageContext)
  const [files, setFiles] = useState(state)

  useEffect(() => {
    setFiles(state)
  }, [state])

  return (
    <div className='flex flex-row mb-10 mt-2 px-3 z-20 w-full gap-2 overflow-auto'>
      {Object.keys(files).length !== 0 ? (
        <div className='w-full flex gap-2 flex-wrap'>
          <PhotoProvider
            overlayRender={props => {
              return (
                <>
                  <SlideToolbar {...props} items={['arrowLeft', 'countText', 'arrowRight']} />
                  <CloseButton onClick={props.onClose} />
                </>
              )
            }}
          >
            {Object.keys(files).map((key: string) => {
              return (
                <div className='relative' key={files[key].file.uid}>
                  <PhotoView src={files[key].url}>
                    <img className='w-16 h-16 rounded-md cursor-pointer object-cover ' src={files[key].url} />
                  </PhotoView>
                  <div
                    className='absolute rounded-full bg-slate-600 right-1 top-1 p-[2px] cursor-pointer'
                    onClick={() => {
                      removeFile(files[key].file)
                    }}
                  >
                    <Icons.close color='#cacdce' className='h-3 w-3' />
                  </div>
                </div>
              )
            })}
          </PhotoProvider>
          <UploadImage>
            <div className='w-16 h-16 border-dashed rounded-md border border-slate-500 bg-accent relative'>
              <Icons.add className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
            </div>
          </UploadImage>
        </div>
      ) : null}
    </div>
  )
})
