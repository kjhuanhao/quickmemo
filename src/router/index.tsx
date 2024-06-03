import Home from '@/pages/Home'
import { LayoutGrid, LucideProps } from 'lucide-react'

type MenuType = 'sidebar' | 'bottom' | 'all' | 'none'

interface IRoute {
  path: string
  name: string
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  hideInMenu: boolean
  menuType: MenuType
  element: () => JSX.Element
}

export const ROUTE_KEY = {
  HOME: 'memo'
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/memo',
    name: ROUTE_KEY.HOME,
    icon: LayoutGrid,
    hideInMenu: false,
    menuType: 'all',
    element: Home
  }
}

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home
}

export const routes = Object.keys(ROUTE_CONFIG).map(key => ({ ...ROUTE_CONFIG[key], key }))
