interface LoginDto {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface RegisterDto {
  email: string
  password: string
  confirmPassword: string
  username: string
  code: string
}

interface UserInfoResponse {
  id: string
  email: string
  username: string
}
