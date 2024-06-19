/* eslint-disable @typescript-eslint/ban-types */
import { errorToast } from '@/utils'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
  reject: Function
}

class AxiosSingleton {
  private static instance: AxiosInstance | null = null
  private static refreshing = false
  private static retryCount = 0
  private static MAX_RETRY_COUNT = 1
  private static queue: PendingTask[] = []

  private constructor() {}

  public static getInstance(config?: AxiosRequestConfig): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = AxiosSingleton.createInstance(config)
    }
    return AxiosSingleton.instance
  }

  private static createInstance(config?: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create({
      baseURL: '/api',
      timeout: 5000, //超时配置
      withCredentials: true, //跨域携带cookie
      ...config // 自定义配置覆盖基本配置
    })

    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config: any) {
        // 在发送请求之前做些什么
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          config.headers['Authorization'] = 'Bearer ' + accessToken
        } else {
          config.headers['Authorization'] = 'Bearer ' + ''
        }

        return config
      },
      function (error) {
        // 对请求错误做些什么
        errorToast('请求错误')

        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // 对响应数据做点什么
        console.log('response:', response)
        const { code, data, message } = response.data
        if (code === 200) return data
        else if (code === 401) {
          console.log(code, '401')
          console.log(response.data, 'xxxxx')
          window.localStorage.clear()
          const originalRequest = response.config
          if (!AxiosSingleton.refreshing && AxiosSingleton.retryCount < AxiosSingleton.MAX_RETRY_COUNT) {
            AxiosSingleton.refreshing = true
            AxiosSingleton.retryCount++
            return AxiosSingleton.refreshToken()
              .then(() => {
                AxiosSingleton.refreshing = false
                AxiosSingleton.retryCount = 0
                AxiosSingleton.queue.forEach(task => task.resolve(AxiosSingleton.instance!.request(task.config)))
                AxiosSingleton.queue.length = 0
                return AxiosSingleton.instance!.request(originalRequest)
              })
              .catch(error => {
                AxiosSingleton.refreshing = false
                AxiosSingleton.queue.forEach(task => task.reject(error))
                AxiosSingleton.queue.length = 0
                window.location.href = '/login'
                return Promise.reject(error)
              })
          } else if (AxiosSingleton.retryCount >= AxiosSingleton.MAX_RETRY_COUNT) {
            window.location.href = '/login'
            errorToast('用户身份过期，请重新登录')
            return Promise.reject(response)
          } else {
            return new Promise((resolve, reject) => {
              AxiosSingleton.queue.push({ config: originalRequest, resolve, reject })
            })
          }
        } else if (code === 500) {
          errorToast(message)
          return Promise.reject(response.data)
        } else {
          errorToast(message)
          console.log(message)
          return Promise.reject(response.data)
        }
      },
      function (error) {
        // 对响应错误做点什么
        errorToast('响应错误')
        return Promise.reject(error)
      }
    )

    return instance
  }

  private static async refreshToken() {
    const res = await AxiosSingleton.instance!.get('/user/refresh', {
      params: {
        token: localStorage.getItem('refreshToken')
      }
    })
    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    return res
  }
}

const request = AxiosSingleton.getInstance()

export { request }
