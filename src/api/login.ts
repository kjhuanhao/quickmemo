import { hashPassword } from '@/utils/encrypt'
import { request } from './request'

export const loginReq = (data: LoginDto): Promise<LoginResponse> => {
  // data.password = hashPassword(data.password, 'jiahao')
  // TODO 上线要加密
  return request.post('/user/login', {
    ...data
  })
}

export const registerReq = (data: RegisterDto): Promise<unknown> => {
  data.password = hashPassword(data.password, 'jiahao')
  data.confirmPassword = hashPassword(data.confirmPassword, 'jiahao')
  return request.post('/user/register', {
    ...data
  })
}

export const getCodeReq = (email: string): Promise<unknown> => {
  return request.get('/user/getVerifyCode', { params: { email } })
}

export const getUserInfoReq = (): Promise<UserInfoResponse> => {
  return request.get('/user/getUserInfo')
}
