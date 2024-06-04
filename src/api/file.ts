import { request } from './request'
export const uploadFileReq = (files: File[]) => {
  const formData = new FormData()
  // 遍历文件数组，将文件添加到FormData中
  files.forEach(file => {
    formData.append('files', file)
  })
  return request.post('/common/upload', {
    files: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onprogress: (progressEvent: ProgressEvent) => {
      // 处理上传进度
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      console.log(`上传进度：${progress}%`)
    }
  })
}
