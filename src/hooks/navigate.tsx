import { ROUTE_CONFIG } from '@/router'
import { useNavigate } from 'react-router-dom'

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key]

export const useGoTo = () => {
  const nav = useNavigate()
  const back = () => nav(-1)
  const go = (pageKey?: string, params?: Record<string, string | number>) => {
    if (!pageKey) {
      nav('/')
      return
    }
    const route = getRouteByKey(pageKey)
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`)
        return
      }
      // /page/:id params: { id: 1 } => /page/1
      const url = route.path.replace(/\/:(\w+)/g, (exp: string, exp1: string) => `/${params[exp1]}`)
      nav(`/${url}`)
    }
  }
  return { back, go }
}
