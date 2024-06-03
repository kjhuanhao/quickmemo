import { Toaster } from 'react-hot-toast'

export function Toast() {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        className: 'dark:!bg-[#262626] dark:!text-slate-100 !border-border dark:!border'
      }}
    />
  )
}
