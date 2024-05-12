import { SlideToolbar, CloseButton } from 'react-image-previewer/ui'
import { PhotoProvider } from 'react-image-previewer'

export const CustomPhotoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
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
      {children}
    </PhotoProvider>
  )
}
