import { ROUTE_CONFIG, routes } from '@/router'
import { useMemo } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

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
      let url = `/${route.path}`
      if (params) {
        const queryString = new URLSearchParams(params as Record<string, string>).toString()
        if (queryString) {
          url += `?${queryString}`
        }
      }
      nav(url)
    }
  }
  return { back, go }
}

/**
 * 获取当前 URL 匹配的路由
 */
export const useMatchedRoute = () => {
  const r = useLocation()
  const route = useMemo(() => routes.find(item => matchPath(`/${item.path}`, r.pathname)), [r.pathname])
  return route
}
