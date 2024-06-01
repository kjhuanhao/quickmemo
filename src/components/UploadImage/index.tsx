import { useContext, useState } from 'react'
import Upload from 'rc-upload'
import { RcFile, UploadProgressEvent, UploadRequestOption } from 'rc-upload/lib/interface'
import { UploadImageContext } from '@/context/uploadContext'
import { errorToast } from '@/utils'

export const UploadImage = ({ children }: { children: React.ReactNode }) => {
  const { getImageCount, addFile } = useContext(UploadImageContext)
  const [fileList, setFileList] = useState<RcFile[]>([])

  const handleBeforeUpload = (file: RcFile) => {
    const totalFiles = fileList.length + getImageCount()
    if (totalFiles >= 9) {
      errorToast('最多只能上传 9 张图片')
      return false
    }
    return true
  }

  const handleSuccess = (file: RcFile) => {
    setFileList(prevList => [...prevList, file])
  }

  const handleError = (error: Error, ret: Record<string, unknown>, file: RcFile) => {
    errorToast(`文件 ${file.name} 上传失败`)
  }

  const uploadProps = {
    action: '/upload.do',
    multiple: true,
    data: {},
    accept: '.jpg,.jpeg,.png',
    headers: {
      Authorization: '$prefix$token'
    },
    onStart() {
      console.log('Start upload')
    },
    onSuccess(res: any, file: RcFile) {
      handleSuccess(file)
    },
    onError(error: Error, ret: Record<string, unknown>, file: RcFile) {
      handleError(error, ret, file)
    },
    onProgress(event: UploadProgressEvent) {
      // 使用event.percent获取进度百分比
      console.log('onProgress', `${event.percent}%`, event.percent)
    },

    beforeUpload(file: RcFile, fileList: RcFile[]): Promise<void | RcFile> {
      return new Promise((resolve, reject) => {
        if (getImageCount() + fileList.length > 9) {
          errorToast('最多只能上传 9 张图片')
          reject(new Error('最多只能上传 9 张图片'))
        } else {
          setTimeout(() => {
            resolve(file)
          }, 3000)
        }
      })
    },

    customRequest(options: UploadRequestOption) {
      const { file, onError, onSuccess } = options
      const obj: RcFile = file as RcFile
      const formData = new FormData()
      formData.append('file', obj, obj.name)
      // 模拟文件上传成功
      addFile(obj)
      // onSuccess?.({ res: 'ok', file: obj }, obj)

      // 如果需要实际上传到服务器的话，可以取消注释下面的代码并进行适当调整
      // axios
      //   .post(action, formData, {
      //     headers,
      //     onUploadProgress: ({ total, loaded }) => {
      //       onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file)
      //     }
      //   })
      //   .then(({ data: response }) => {
      //     onSuccess(response, file)
      //   })
      //   .catch(onError)

      return {
        abort() {
          console.log('upload progress is aborted.')
        }
      }
    }
  }

  return <Upload {...uploadProps}>{children}</Upload>
}
