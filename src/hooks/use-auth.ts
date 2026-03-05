// hooks/use-auth.ts - Super Ultra Simplified Version

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'CUSTOMER'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check auth status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      
      if (token) {
        // Simple token parsing (in real app, verify with backend)
        const userData = JSON.parse(atob(token))
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Simple hardcoded login for demo
      if (email === 'sajid.syed@gmail.com' && password === 'admin123') {
        const userData = {
          id: '1',
          email: 'sajid.syed@gmail.com',
          name: 'Hafiz Sajid Syed',
          role: 'ADMIN' as const
        }
        
        // Create simple token
        const token = btoa(JSON.stringify(userData))
        localStorage.setItem('token', token)
        setUser(userData)
        
        return { success: true }
      }
      
      // Regular user login
      if (email && password) {
        const userData = {
          id: '2',
          email,
          name: email.split('@')[0],
          role: 'CUSTOMER' as const
        }
        
        const token = btoa(JSON.stringify(userData))
        localStorage.setItem('token', token)
        setUser(userData)
        
        return { success: true }
      }
      
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simple registration for demo
      const userData = {
        id: Date.now().toString(),
        email,
        name,
        role: 'CUSTOMER' as const
      }
      
      const token = btoa(JSON.stringify(userData))
      localStorage.setItem('token', token)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  const isAdmin = user?.role === 'ADMIN'

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin
  }
}

// Protected route hook
export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}

// Admin only hook
export function useRequireAdmin(redirectTo = '/') {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push(redirectTo)
    }
  }, [user, loading, isAdmin, router, redirectTo])

  return { user, loading, isAdmin }
}