import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import BottomMenu from '@/components/BottomMenu'
import { Toast } from '@/components/Toast'
import { lazy, Suspense, useEffect } from 'react'
import { getUserInfoReq } from '@/api/login'
import { useMatchedRoute } from '@/hooks/navigate'
import { Loading } from '@/components/Loading'
import { RssProvider } from '@/context/RssContext'

// 懒加载的组件
const MemoSidebar = lazy(() => import('@/components/MemoSidebar'))
const RssSidebar = lazy(() => import('@/components/RssSidebar'))

const Layout = () => {
  const navigate = useNavigate()
  const route = useMatchedRoute()

  // 根据路由路径渲染不同的侧边栏组件
  const renderSecondSidebar = () => {
    if (route?.path.includes('memo')) {
      return <MemoSidebar className='border-2 border-x-sidebar-border' />
    } else if (route?.path.includes('rss')) {
      return <RssSidebar className='border-2 border-x-sidebar-border' />
    }
    return null
  }

  useEffect(() => {
    getUserInfoReq().then(res => {
      window.localStorage.setItem('userInfo', JSON.stringify(res))
    })
  }, [])

  return (
    <RssProvider>
      <div className='flex flex-row w-screen'>
        <Toast />
        <Sidebar className='min-w-[75px]' />
        <BottomMenu />
        <div className='min-w-[350px] h-auto hidden pad:flex'>
          {/* 这里根据路由去切换第二侧边栏 */}
          <Suspense fallback={<Loading />}>{renderSecondSidebar()}</Suspense>
        </div>
        <div className='p-4 pad:p-7 my-0 mx-auto w-full overflow-auto'>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </RssProvider>
  )
}

export default Layout
