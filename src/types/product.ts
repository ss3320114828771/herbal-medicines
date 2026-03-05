// types/product.ts - Super Ultra Simplified Version

// Product interface
export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
  herbal: boolean
  createdAt?: string
  updatedAt?: string
}

// Product category type
export type ProductCategory = 
  | 'Immune Support'
  | 'Digestive Health'
  | 'Stress Relief'
  | 'Sleep Aid'
  | 'Heart Health'
  | 'Joint Support'
  | 'Liver Care'
  | 'Energy Boost'

// Create product input
export interface CreateProductInput {
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl?: string
  herbal?: boolean
}

// Update product input
export interface UpdateProductInput {
  name?: string
  description?: string
  price?: number
  stock?: number
  category?: string
  imageUrl?: string
  herbal?: boolean
}

// Product filters
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  herbal?: boolean
  inStock?: boolean
  search?: string
}

// Product sort options
export type ProductSortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'popular'

// Product review
export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// Product with details
export interface ProductWithDetails extends Product {
  reviews?: ProductReview[]
  averageRating?: number
  totalReviews?: number
}

// Helper functions
export const getAllCategories = (): ProductCategory[] => {
  return [
    'Immune Support',
    'Digestive Health',
    'Stress Relief',
    'Sleep Aid',
    'Heart Health',
    'Joint Support',
    'Liver Care',
    'Energy Boost'
  ]
}

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Immune Support': 'from-green-500 to-emerald-500',
    'Digestive Health': 'from-blue-500 to-cyan-500',
    'Stress Relief': 'from-purple-500 to-pink-500',
    'Sleep Aid': 'from-indigo-500 to-purple-500',
    'Heart Health': 'from-red-500 to-pink-500',
    'Joint Support': 'from-yellow-500 to-orange-500',
    'Liver Care': 'from-green-500 to-teal-500',
    'Energy Boost': 'from-orange-500 to-red-500'
  }
  return colors[category] || 'from-gray-500 to-gray-600'
}

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Immune Support': '🛡️',
    'Digestive Health': '🌱',
    'Stress Relief': '🧘',
    'Sleep Aid': '😴',
    'Heart Health': '❤️',
    'Joint Support': '🦴',
    'Liver Care': '🌿',
    'Energy Boost': '⚡'
  }
  return icons[category] || '📦'
}

export const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock > 20) return { text: 'In Stock', color: 'text-green-400' }
  if (stock > 10) return { text: 'Low Stock', color: 'text-yellow-400' }
  if (stock > 0) return { text: 'Very Low Stock', color: 'text-orange-400' }
  return { text: 'Out of Stock', color: 'text-red-400' }
}

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

export const calculateDiscountPrice = (price: number, discountPercent: number): number => {
  return price - (price * discountPercent / 100)
}

// Sample products data
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Black Seed Oil',
    description: 'Pure cold-pressed black seed oil for immune support',
    price: 45.99,
    stock: 25,
    category: 'Immune Support',
    imageUrl: '/n1.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Organic Raw Honey',
    description: 'Raw organic honey with traditional healing herbs',
    price: 64.52,
    stock: 15,
    category: 'Digestive Health',
    imageUrl: '/n2.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Immune Booster',
    description: 'Powerful blend of echinacea and elderberry',
    price: 89.99,
    stock: 8,
    category: 'Immune Support',
    imageUrl: '/n3.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Stress Relief Formula',
    description: 'Ashwagandha and holy basil for stress relief',
    price: 52.50,
    stock: 20,
    category: 'Stress Relief',
    imageUrl: '/n4.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  }
]

// Sample reviews
export const sampleReviews: ProductReview[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Ahmed Khan',
    rating: 5,
    comment: 'Excellent quality! Noticed results within a week.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Fatima Zahra',
    rating: 4,
    comment: 'Good product, fast shipping.',
    createdAt: new Date().toISOString()
  }
]