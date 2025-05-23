import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Orders } from './pages/app/orders/orders'
import { Shoping } from './pages/app/shopping/shopping'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { NotFound } from './pages/404'
import { ProtectedRoute } from './components/protected-route'
import { RootRedirectWrapper } from './components/root-redirect-wrapper'
import { Cart } from './pages/app/shopping/cart'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirectWrapper />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'shopping',
            element: <Shoping />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
