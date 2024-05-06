import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import BottomMenu from '@/components/BottomMenu'
import { Button } from '@/components/ui/button'

const Layout = () => {
  return (
    <div className='flex flex-row w-screen'>
      <Sidebar />
      <BottomMenu />
      <div className='min-w-80 h-screen border-r-slate-300 border-r hidden pad:flex'>
        <Button>123</Button>
      </div>
      <div className='p-4 pad:p-7 my-0 mx-auto w-full'>
        <Outlet />
      </div>
    </div>
  )
}
export default Layout
