import { Link, useNavigate } from 'react-router-dom'
import { routes } from '@/router'
import { Button } from '@/components/ui/button'
import Avatar from '@/assets/img/avatar.jpg'

function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className='flex-col gap-10 mr-10 bg-accent min-w-16 hidden pad:flex h-screen items-center'>
      {/* 头像区域 */}
      <div className='flex mt-10'>
        <Button variant='ghost' size='icon'>
          <img src={Avatar} alt='avatar' className='rounded-md w-10 h-10' />
        </Button>
      </div>
      {routes.map(item => {
        if (!item.hideInMenu) {
          const Icon = item.icon!
          return (
            <Link key={item.key} to={item.path}>
              <div>
                <Button
                  key={item.path}
                  variant='ghost'
                  size='icon'
                  className='hover:bg-[#ececec] dark:hover:bg-[#272727]'
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={20} className='fill-[#8b8b8b] dark:fill-[#8b8b8b]' color='#8b8b8b' />
                </Button>
              </div>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default Sidebar
