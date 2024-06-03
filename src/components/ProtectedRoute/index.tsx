import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
