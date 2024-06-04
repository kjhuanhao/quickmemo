import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { request } from '@/api/request'

interface ImageContextType {
  images: { file: File; progress: number; url?: string }[]
  addImages: (files: File[]) => void
  removeImage: (index: number) => void
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider')
  }
  return context
}

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<{ file: File; progress: number; url?: string }[]>([])
  const [uploadQueue, setUploadQueue] = useState<{ file: File; index: number }[]>([])

  useEffect(() => {
    if (uploadQueue.length > 0) {
      const { file, index } = uploadQueue[0]
      uploadImage(file, index).then(() => {
        setUploadQueue(queue => queue.slice(1))
      })
    }
  }, [uploadQueue])

  const addImages = (files: File[]) => {
    if (images.length + files.length <= 9) {
      setImages(prevImages => {
        const newImages = files.map(file => ({ file, progress: 0 }))
        const updatedImages = [...prevImages, ...newImages]
        setUploadQueue(queue => [
          ...queue,
          ...newImages.map((_, i) => ({ file: files[i], index: prevImages.length + i }))
        ])
        return updatedImages
      })
    } else {
      alert('最多只能上传9张图片')
    }
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const uploadImage = async (image: File, index: number) => {
    const formData = new FormData()
    formData.append('files', image)

    try {
      const response: any = await request.request({
        method: 'POST',
        url: '/common/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        onUploadProgress: (event: any) => {
          const progress = Math.round((event.loaded * 100) / event.total)
          setImages(prevImages => prevImages.map((img, i) => (i === index ? { ...img, progress } : img)))
        }
      })

      setImages(prevImages => prevImages.map((img, i) => (i === index ? { ...img, url: response[0].url } : img)))
    } catch (error) {
      console.error('上传失败', error)
    }
  }

  return <ImageContext.Provider value={{ images, addImages, removeImage }}>{children}</ImageContext.Provider>
}
