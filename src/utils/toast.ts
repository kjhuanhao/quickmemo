import { toast } from 'react-hot-toast'

export const successToast = (message: string, duration: number = 1000) => {
  toast.success(message, { duration })
}

export const errorToast = (message: string) => {
  toast.error(message)
}

export const loadingToast = (message: string = 'Loading...') => {
  toast.loading(message)
}

export const promiseToast = (
  promise: Promise<any>,
  loadingText: string = '加载中...',
  successText: string = '成功',
  errorText: string = '失败'
) => {
  toast.promise(promise, {
    loading: loadingText,
    success: successText,
    error: errorText
  })
}
