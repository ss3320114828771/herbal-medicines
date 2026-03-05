// app/api/users/route.ts
// Super ultra simplified version - No external packages

// Sample users data
const users = [
  {
    id: '1',
    email: 'sajid.syed@gmail.com',
    name: 'Hafiz Sajid Syed',
    role: 'ADMIN',
    orders: 45,
    totalSpent: 5678.90,
    joined: '2020-01-15',
    status: 'active'
  },
  {
    id: '2',
    email: 'ahmed.khan@example.com',
    name: 'Ahmed Khan',
    role: 'CUSTOMER',
    orders: 12,
    totalSpent: 1234.50,
    joined: '2023-03-20',
    status: 'active'
  },
  {
    id: '3',
    email: 'fatima.zahra@example.com',
    name: 'Fatima Zahra',
    role: 'CUSTOMER',
    orders: 8,
    totalSpent: 876.25,
    joined: '2023-06-10',
    status: 'active'
  },
  {
    id: '4',
    email: 'mohammad.ali@example.com',
    name: 'Mohammad Ali',
    role: 'CUSTOMER',
    orders: 3,
    totalSpent: 234.75,
    joined: '2023-09-05',
    status: 'inactive'
  },
  {
    id: '5',
    email: 'ayesha.begum@example.com',
    name: 'Ayesha Begum',
    role: 'CUSTOMER',
    orders: 15,
    totalSpent: 1876.30,
    joined: '2022-11-18',
    status: 'active'
  }
]

// GET /api/users
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const role = url.searchParams.get('role')
    const status = url.searchParams.get('status')
    
    let filteredUsers = [...users]
    
    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role)
    }
    
    // Filter by status
    if (status) {
      filteredUsers = filteredUsers.filter(u => u.status === status)
    }
    
    // Remove sensitive info
    const safeUsers = filteredUsers.map(({ ...user }) => user)
    
    return new Response(JSON.stringify(safeUsers), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.email || !body.name) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: email, name' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Check if user exists
    const existingUser = users.find(u => u.email === body.email)
    if (existingUser) {
      return new Response(JSON.stringify({ 
        error: 'User already exists' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Create new user
    const newUser = {
      id: String(users.length + 1),
      email: body.email,
      name: body.name,
      role: body.role || 'CUSTOMER',
      orders: 0,
      totalSpent: 0,
      joined: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    users.push(newUser)

    return new Response(JSON.stringify({ 
      success: true,
      user: newUser 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// GET /api/users/[id]
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = users.find(u => u.id === params.id)
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PUT /api/users/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const userIndex = users.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...body,
      name: body.name || users[userIndex].name,
      role: body.role || users[userIndex].role,
      status: body.status || users[userIndex].status
    }

    return new Response(JSON.stringify({ 
      success: true,
      user: users[userIndex]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PATCH /api/users/[id] (for status updates)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const userIndex = users.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Update only status
    if (body.status) {
      users[userIndex].status = body.status
    }
    
    if (body.role) {
      users[userIndex].role = body.role
    }

    return new Response(JSON.stringify({ 
      success: true,
      user: users[userIndex]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE /api/users/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userIndex = users.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Don't allow deleting admin
    if (users[userIndex].role === 'ADMIN') {
      return new Response(JSON.stringify({ 
        error: 'Cannot delete admin user' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Remove user
    users.splice(userIndex, 1)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// GET /api/users/stats
export async function GET_STATS() {
  try {
    const totalUsers = users.length
    const activeUsers = users.filter(u => u.status === 'active').length
    const totalOrders = users.reduce((sum, u) => sum + u.orders, 0)
    const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0)
    const newThisMonth = users.filter(u => {
      const joinDate = new Date(u.joined)
      const now = new Date()
      return joinDate.getMonth() === now.getMonth() && 
             joinDate.getFullYear() === now.getFullYear()
    }).length

    return new Response(JSON.stringify({
      totalUsers,
      activeUsers,
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      newThisMonth,
      admins: users.filter(u => u.role === 'ADMIN').length,
      customers: users.filter(u => u.role === 'CUSTOMER').length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Helper function to handle different methods for dynamic routes
export async function handler(request: Request, { params }: { params: { id: string } }) {
  const method = request.method
  const url = new URL(request.url)
  
  // Handle stats route
  if (url.pathname.endsWith('/stats')) {
    return GET_STATS()
  }

  switch (method) {
    case 'GET':
      return params?.id ? GET_BY_ID(request, { params }) : GET(request)
    case 'PUT':
      return PUT(request, { params })
    case 'PATCH':
      return PATCH(request, { params })
    case 'DELETE':
      return DELETE(request, { params })
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
  }
}