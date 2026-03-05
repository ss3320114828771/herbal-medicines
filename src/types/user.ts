// types/user.ts - Super Ultra Simplified Version

// User role type
export type UserRole = 'ADMIN' | 'CUSTOMER'

// User interface
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt?: string
  updatedAt?: string
  avatar?: string
  phone?: string
  address?: UserAddress
}

// User address interface
export interface UserAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Create user input
export interface CreateUserInput {
  email: string
  password: string
  name: string
  role?: UserRole
  phone?: string
}

// Update user input
export interface UpdateUserInput {
  name?: string
  email?: string
  phone?: string
  address?: UserAddress
  role?: UserRole
}

// Login credentials
export interface LoginCredentials {
  email: string
  password: string
}

// Register input
export interface RegisterInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Auth response
export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// User stats
export interface UserStats {
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate?: string
  memberSince: string
}

// User with details
export interface UserWithDetails extends User {
  stats?: UserStats
  recentOrders?: any[]
}

// Helper functions
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'ADMIN'
}

export const isCustomer = (user: User | null): boolean => {
  return user?.role === 'CUSTOMER'
}

export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const getRoleBadgeColor = (role: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-500/20 text-purple-300'
    case 'CUSTOMER':
      return 'bg-blue-500/20 text-blue-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

export const formatMemberSince = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

// Sample users data
export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'sajid.syed@gmail.com',
    name: 'Hafiz Sajid Syed',
    role: 'ADMIN',
    createdAt: '2020-01-15T00:00:00Z',
    phone: '+1 234 567 8900',
    address: {
      street: '123 Admin St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: '2',
    email: 'ahmed.khan@example.com',
    name: 'Ahmed Khan',
    role: 'CUSTOMER',
    createdAt: '2023-03-20T00:00:00Z',
    phone: '+1 234 567 8901'
  },
  {
    id: '3',
    email: 'fatima.zahra@example.com',
    name: 'Fatima Zahra',
    role: 'CUSTOMER',
    createdAt: '2023-06-10T00:00:00Z'
  },
  {
    id: '4',
    email: 'mohammad.ali@example.com',
    name: 'Mohammad Ali',
    role: 'CUSTOMER',
    createdAt: '2023-09-05T00:00:00Z'
  }
]

// Sample user stats
export const sampleUserStats: Record<string, UserStats> = {
  '1': {
    totalOrders: 45,
    totalSpent: 5678.90,
    averageOrderValue: 126.20,
    memberSince: '2020-01-15'
  },
  '2': {
    totalOrders: 12,
    totalSpent: 1234.50,
    averageOrderValue: 102.88,
    lastOrderDate: '2024-01-10',
    memberSince: '2023-03-20'
  },
  '3': {
    totalOrders: 8,
    totalSpent: 876.25,
    averageOrderValue: 109.53,
    lastOrderDate: '2024-01-05',
    memberSince: '2023-06-10'
  }
}