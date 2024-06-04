import { request } from './request'

export const loginReq = (data: LoginDto): Promise<LoginResponse> => {
  return request.post('/user/login', {
    ...data
  })
}

export const registerReq = (data: RegisterDto): Promise<unknown> => {
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
