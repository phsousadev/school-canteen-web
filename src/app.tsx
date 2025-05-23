import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from 'sonner'

import { router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { AuthProvider } from './context/AuthContext'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="schoolcanteen-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | school.canteen" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
