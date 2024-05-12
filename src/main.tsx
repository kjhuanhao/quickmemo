import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@/context/ThemeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTE_COMPONENT, routes } from '@/router'
import Layout from '@/Layout'
import './index.css'
import '@/config/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='theme'>
      <BrowserRouter>
        <Routes>
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
