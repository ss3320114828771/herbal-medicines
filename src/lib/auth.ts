// lib/auth.ts - Super Ultra Simplified Version

// User roles
export type UserRole = 'ADMIN' | 'CUSTOMER'

// User interface
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

// Simple token functions
export const createToken = (user: User): string => {
  // Create simple token with expiry (7 days)
  const tokenData = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  }
  return btoa(JSON.stringify(tokenData))
}

export const verifyToken = (token: string): User | null => {
  try {
    const data = JSON.parse(atob(token))
    
    // Check if expired
    if (data.exp < Date.now()) {
      return null
    }
    
    // Return user data (without exp)
    const { exp, ...user } = data
    return user as User
  } catch {
    return null
  }
}

// Permission checks
export const canViewDashboard = (user: User | null): boolean => {
  return user?.role === 'ADMIN'
}

export const canManageProducts = (user: User | null): boolean => {
  return user?.role === 'ADMIN'
}

export const canManageOrders = (user: User | null): boolean => {
  return user?.role === 'ADMIN'
}

export const canManageUsers = (user: User | null): boolean => {
  return user?.role === 'ADMIN'
}

// Session management
export const getSession = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const token = localStorage.getItem('token')
  if (!token) return null
  
  return verifyToken(token)
}

export const setSession = (user: User): void => {
  const token = createToken(user)
  localStorage.setItem('token', token)
}

export const clearSession = (): void => {
  localStorage.removeItem('token')
}

// Simple login function (for demo)
export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  // Hardcoded admin for demo
  if (email === 'sajid.syed@gmail.com' && password === 'admin123') {
    const user: User = {
      id: '1',
      email: 'sajid.syed@gmail.com',
      name: 'Hafiz Sajid Syed',
      role: 'ADMIN'
    }
    setSession(user)
    return { success: true, user }
  }

  // Demo customer login
  if (email && password) {
    const user: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role: 'CUSTOMER'
    }
    setSession(user)
    return { success: true, user }
  }

  return { success: false, error: 'Invalid credentials' }
}

// Simple register function
export const register = async (name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  // Check if email is admin
  const role: UserRole = email === 'sajid.syed@gmail.com' ? 'ADMIN' : 'CUSTOMER'

  const user: User = {
    id: Date.now().toString(),
    email,
    name,
    role
  }

  setSession(user)
  return { success: true, user }
}

// Logout function
export const logout = (): void => {
  clearSession()
}

// Protected route helper
export const requireAuth = (redirectTo: string = '/login'): User | null => {
  const user = getSession()
  
  if (!user && typeof window !== 'undefined') {
    window.location.href = redirectTo
    return null
  }
  
  return user
}

// Admin route helper
export const requireAdmin = (redirectTo: string = '/'): User | null => {
  const user = getSession()
  
  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return null
  }
  
  if (user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
    return null
  }
  
  return user
}