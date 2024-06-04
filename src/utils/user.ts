interface UserInfo {
  id: string
  email: string
  username: string
}
export const getUserInfo = (): UserInfo | null => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    return JSON.parse(userInfo)
  }
  return null
}
