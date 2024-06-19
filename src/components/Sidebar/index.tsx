import { Link, useNavigate, useLocation } from 'react-router-dom'
import { routes } from '@/router'
import { Button } from '@/components/ui/button'
import Avatar from '@/assets/img/avatar.jpg'
import { cva } from 'class-variance-authority'
import { ThemeToggle } from '../ThemeToggle'
import RssSidebar from '../RssSidebar/index'
import { cn } from '@/lib/utils'

const buttonVariants = cva('hover:bg-[#ececec] dark:hover:bg-[#272727]', {
  variants: {
    selected: {
      true: 'bg-white dark:bg-sidebar-hover',
      false: 'hover:bg-sidebar-hover'
    }
  },
  defaultVariants: {
    selected: false
  }
})

const iconVariants = cva('', {
  variants: {
    selected: {
      true: 'text-primary dark:text-[#8471FF] ',
      false: 'text-[#4C4E52] dark:text-[#6C6B6D]'
    }
  },
  defaultVariants: {
    selected: false
  }
})
interface RssSidebarProps {
  className?: string
}
const Sidebar: React.FC<RssSidebarProps> = ({ className }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={cn('flex-col gap-10 bg-sidebar-background hidden pad:flex min-h-screen items-center', className)}>
      {/* 头像区域 */}
      <div className='flex mt-10'>
        <Button variant='ghost' size='icon'>
          <img src={Avatar} alt='avatar' className='rounded-md w-10 h-10' />
        </Button>
      </div>
      {routes.map(item => {
        if (!item.hideInMenu) {
          const Icon = item.icon!
          const isActive = location.pathname === `/${item.path}`
          return (
            <Link key={item.key} to={`/${item.path}`}>
              <div>
                <Button
                  key={item.path}
                  variant='ghost'
                  size='icon'
                  className={buttonVariants({ selected: isActive })}
                  onClick={() => navigate(`/${item.path}`)}
                >
                  <Icon size={26} className={iconVariants({ selected: isActive })} />
                </Button>
              </div>
            </Link>
          )
        }
      })}
      <div>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Sidebar
