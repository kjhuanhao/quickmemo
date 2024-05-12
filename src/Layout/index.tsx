import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import BottomMenu from '@/components/BottomMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Toaster } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { successToast } from '@/utils/toast'

const Layout = () => {
  return (
    <div className='flex flex-row w-screen'>
      <Toaster
        position='top-center'
        toastOptions={{
          className: 'dark:!bg-[#262626] dark:!text-slate-100 !border-border dark:!border'
        }}
      />
      <Sidebar />
      <BottomMenu />
      <div className='min-w-80 h-screen border-r-slate-300 border-r hidden pad:flex'>
        <ThemeToggle />
        <Button
          onClick={() => {
            successToast('123')
          }}
        >
          1
        </Button>
      </div>
      <div className='p-4 pad:p-7 my-0 mx-auto w-full overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}
export default Layout
