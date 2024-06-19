import { RssInfoCard } from '@/components/RssInfoCard'
import Home from '@/pages/Home'
import ReadLater from '@/pages/ReadLater'
import RssPage from '@/pages/Rss'
import { LayoutGrid, LucideProps, Rss } from 'lucide-react'

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
  HOME: 'memo',
  RSS_ALL: 'rss',
  RSS_READ_LATER: 'rss/readLater',
  RSS_SUBSCRIPTION: 'rss/subscription'
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'memo',
    name: ROUTE_KEY.HOME,
    icon: LayoutGrid,
    hideInMenu: false,
    menuType: 'all',
    element: Home
  },
  [ROUTE_KEY.RSS_ALL]: {
    path: 'rss',
    name: ROUTE_KEY.RSS_ALL,
    icon: Rss,
    hideInMenu: false,
    menuType: 'all',
    element: RssPage
  },
  [ROUTE_KEY.RSS_READ_LATER]: {
    path: 'rss/readLater',
    name: ROUTE_KEY.RSS_READ_LATER,
    icon: Rss,
    hideInMenu: true,
    menuType: 'none',
    element: ReadLater
  },
  [ROUTE_KEY.RSS_SUBSCRIPTION]: {
    path: 'rss/subscription',
    name: ROUTE_KEY.RSS_SUBSCRIPTION,
    icon: Rss,
    hideInMenu: true,
    menuType: 'none',
    element: RssInfoCard
  }
}

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.RSS_ALL]: RssPage,
  [ROUTE_KEY.RSS_READ_LATER]: ReadLater,
  [ROUTE_KEY.RSS_SUBSCRIPTION]: RssInfoCard
}

export const routes = Object.keys(ROUTE_CONFIG).map(key => ({ ...ROUTE_CONFIG[key], key }))
