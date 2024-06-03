import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@/context/ThemeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTE_COMPONENT, routes } from '@/router'
import Layout from '@/Layout'
import './index.css'
import '@/config/i18n'
import Login from './pages/Login'
import Register from './pages/Login/register'
import ResetPassword from './pages/Login/forgetPassword'
import { NotFound } from './pages/NotFound'
import ProtectedRoute from '@/components/ProtectedRoute'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='theme'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path='/forget' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            {routes.map(item => {
              const Component = ROUTE_COMPONENT[item.key]
              return <Route key={item.key} path={item.path} element={<Component />} />
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
