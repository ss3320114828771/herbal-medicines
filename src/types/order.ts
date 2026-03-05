// types/order.ts - Super Ultra Simplified Version

// Order status enum
export type OrderStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED'

// Order item interface
export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

// Order interface
export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  
  // Shipping info
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  // Payment info
  paymentMethod: string
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED'
}

// Create order input
export interface CreateOrderInput {
  userId: string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
}

// Update order input
export interface UpdateOrderInput {
  status?: OrderStatus
  paymentStatus?: 'PAID' | 'PENDING' | 'FAILED'
  trackingNumber?: string
}

// Order summary
export interface OrderSummary {
  id: string
  userName: string
  total: number
  status: OrderStatus
  createdAt: string
  itemCount: number
}

// Order statistics
export interface OrderStats {
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
  averageOrderValue: number
}

// Helper functions
export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'PROCESSING':
      return 'bg-blue-500/20 text-blue-300'
    case 'SHIPPED':
      return 'bg-purple-500/20 text-purple-300'
    case 'DELIVERED':
      return 'bg-green-500/20 text-green-300'
    case 'CANCELLED':
      return 'bg-red-500/20 text-red-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

export const getOrderStatusText = (status: OrderStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'PROCESSING':
      return 'Processing'
    case 'SHIPPED':
      return 'Shipped'
    case 'DELIVERED':
      return 'Delivered'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

export const getPaymentStatusColor = (status: string): string => {
  switch (status) {
    case 'PAID':
      return 'bg-green-500/20 text-green-300'
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'FAILED':
      return 'bg-red-500/20 text-red-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

// Sample order data
export const sampleOrder: Order = {
  id: '1',
  userId: 'user123',
  userName: 'Ahmed Khan',
  userEmail: 'ahmed@example.com',
  items: [
    {
      id: 'item1',
      productId: 'prod1',
      productName: 'Black Seed Oil',
      quantity: 2,
      price: 45.99,
      total: 91.98
    },
    {
      id: 'item2',
      productId: 'prod2',
      productName: 'Organic Honey',
      quantity: 1,
      price: 64.52,
      total: 64.52
    }
  ],
  subtotal: 156.50,
  shipping: 0,
  tax: 0,
  total: 156.50,
  status: 'PENDING',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  paymentMethod: 'Credit Card',
  paymentStatus: 'PAID'
}