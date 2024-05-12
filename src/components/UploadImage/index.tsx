import { useContext } from 'react'
import Upload from 'rc-upload'
import { RcFile, UploadProgressEvent, UploadRequestOption } from 'rc-upload/lib/interface'
import { UploadImageContext } from '@/context/uploadContext'

export const UploadImage = ({ children }: { children: React.ReactNode }) => {
  const { addFile } = useContext(UploadImageContext)
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
    onSuccess(props: unknown) {
      const { res, obj } = props as { res: string; obj: RcFile }
      const tempUrl = URL.createObjectURL(obj)
      addFile(obj)
    },
    onError(err: unknown) {
      console.log('onError', err)
    },
    onProgress(event: UploadProgressEvent) {
      // 使用event.percent获取进度百分比
      console.log('onProgress', `${event.percent}%`, event.percent)
    },
    customRequest(options: UploadRequestOption) {
      const { file, headers, onError, onProgress, onSuccess } = options
      const obj: RcFile = file as RcFile
      const formData = new FormData()
      formData.append('file', obj, obj.name)
      // 获取 base64 返回，前端可以暂时展示
      // 获取 url 返回，前端可以展
      onSuccess?.({ res: 'ok', obj })
      // axios
      //   .post(action, formData, {
      //     withCredentials,
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
