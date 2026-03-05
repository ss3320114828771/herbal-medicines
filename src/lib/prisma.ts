// lib/prisma.ts - Super Ultra Simplified Version
// Note: This is a mock version since we're not using actual Prisma

// Mock data store
const mockData = {
  users: [
    {
      id: '1',
      email: 'sajid.syed@gmail.com',
      name: 'Hafiz Sajid Syed',
      role: 'ADMIN',
      createdAt: new Date('2020-01-15'),
      updatedAt: new Date()
    },
    {
      id: '2',
      email: 'customer@example.com',
      name: 'Test Customer',
      role: 'CUSTOMER',
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date()
    }
  ],
  products: [
    {
      id: '1',
      name: 'Black Seed Oil',
      description: 'Pure cold-pressed black seed oil for immune support',
      price: 45.99,
      stock: 25,
      category: 'Immune Support',
      imageUrl: '/n1.jpeg',
      herbal: true,
      createdAt: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  orders: [
    {
      id: '1',
      userId: '2',
      total: 156.50,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: '101',
          productId: '1',
          quantity: 2,
          price: 45.99
        },
        {
          id: '102',
          productId: '2',
          quantity: 1,
          price: 64.52
        }
      ]
    }
  ]
}

// Mock Prisma Client
class PrismaClient {
  user = {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      const user = mockData.users.find(u => 
        (where.id && u.id === where.id) || 
        (where.email && u.email === where.email)
      )
      return user || null
    },
    
    findMany: async () => {
      return mockData.users
    },
    
    create: async ({ data }: { data: any }) => {
      const newUser = {
        id: String(mockData.users.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockData.users.push(newUser)
      return newUser
    },
    
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const index = mockData.users.findIndex(u => u.id === where.id)
      if (index === -1) throw new Error('User not found')
      
      mockData.users[index] = {
        ...mockData.users[index],
        ...data,
        updatedAt: new Date()
      }
      return mockData.users[index]
    },
    
    delete: async ({ where }: { where: { id: string } }) => {
      const index = mockData.users.findIndex(u => u.id === where.id)
      if (index === -1) throw new Error('User not found')
      
      const deleted = mockData.users[index]
      mockData.users.splice(index, 1)
      return deleted
    }
  }

  product = {
    findUnique: async ({ where }: { where: { id: string } }) => {
      const product = mockData.products.find(p => p.id === where.id)
      return product || null
    },
    
    findMany: async ({ where, take }: { where?: any; take?: number } = {}) => {
      let products = [...mockData.products]
      
      if (where?.category) {
        products = products.filter(p => p.category === where.category)
      }
      
      if (take) {
        products = products.slice(0, take)
      }
      
      return products
    },
    
    create: async ({ data }: { data: any }) => {
      const newProduct = {
        id: String(mockData.products.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockData.products.push(newProduct)
      return newProduct
    },
    
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const index = mockData.products.findIndex(p => p.id === where.id)
      if (index === -1) throw new Error('Product not found')
      
      mockData.products[index] = {
        ...mockData.products[index],
        ...data,
        updatedAt: new Date()
      }
      return mockData.products[index]
    },
    
    delete: async ({ where }: { where: { id: string } }) => {
      const index = mockData.products.findIndex(p => p.id === where.id)
      if (index === -1) throw new Error('Product not found')
      
      const deleted = mockData.products[index]
      mockData.products.splice(index, 1)
      return deleted
    }
  }

  order = {
    findUnique: async ({ where }: { where: { id: string } }) => {
      const order = mockData.orders.find(o => o.id === where.id)
      return order || null
    },
    
    findMany: async ({ where, include }: { where?: any; include?: any } = {}) => {
      let orders = [...mockData.orders]
      
      if (where?.userId) {
        orders = orders.filter(o => o.userId === where.userId)
      }
      
      if (where?.status) {
        orders = orders.filter(o => o.status === where.status)
      }
      
      // Mock include for user data
      if (include?.user) {
        orders = orders.map(order => ({
          ...order,
          user: mockData.users.find(u => u.id === order.userId)
        }))
      }
      
      return orders
    },
    
    create: async ({ data }: { data: any }) => {
      const newOrder = {
        id: String(mockData.orders.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockData.orders.push(newOrder)
      return newOrder
    },
    
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const index = mockData.orders.findIndex(o => o.id === where.id)
      if (index === -1) throw new Error('Order not found')
      
      mockData.orders[index] = {
        ...mockData.orders[index],
        ...data,
        updatedAt: new Date()
      }
      return mockData.orders[index]
    }
  }
}

// Export a singleton instance
const prisma = new PrismaClient()
export default prisma

// Helper to reset mock data (for development)
export const resetMockData = () => {
  // Reset to initial state if needed
  console.log('Mock data reset')
}