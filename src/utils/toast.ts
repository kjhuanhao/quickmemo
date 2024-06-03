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
