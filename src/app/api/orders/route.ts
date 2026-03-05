// app/api/orders/route.ts
// Super ultra simplified version - No external packages

// Sample orders data
const orders = [
  {
    id: '1',
    userId: '1',
    total: 156.50,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    user: {
      name: 'Ahmed Khan',
      email: 'ahmed@example.com'
    },
    items: [
      {
        id: '101',
        quantity: 2,
        price: 45.99,
        product: { name: 'Black Seed Oil' }
      },
      {
        id: '102',
        quantity: 1,
        price: 64.52,
        product: { name: 'Honey with Herbs' }
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    total: 89.99,
    status: 'DELIVERED',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
    user: {
      name: 'Fatima Zahra',
      email: 'fatima@example.com'
    },
    items: [
      {
        id: '103',
        quantity: 1,
        price: 89.99,
        product: { name: 'Herbal Immunity Booster' }
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    total: 234.75,
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    user: {
      name: 'Mohammad Ali',
      email: 'mohammad@example.com'
    },
    items: [
      {
        id: '104',
        quantity: 3,
        price: 45.25,
        product: { name: 'Digestive Herbal Tea' }
      },
      {
        id: '105',
        quantity: 2,
        price: 52.50,
        product: { name: 'Stress Relief Formula' }
      }
    ]
  }
]

// GET /api/orders
export async function GET() {
  try {
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST /api/orders
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Create new order
    const newOrder = {
      id: String(orders.length + 1),
      userId: body.userId || '1',
      total: body.total || 0,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      user: {
        name: body.userName || 'Customer',
        email: body.userEmail || 'customer@example.com'
      },
      items: body.items || []
    }

    // In real app, save to database
    orders.push(newOrder)

    return new Response(JSON.stringify({ 
      success: true,
      order: newOrder 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// GET /api/orders/[id]
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const order = orders.find(o => o.id === params.id)
    
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PATCH /api/orders/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      status: body.status || orders[orderIndex].status
    }

    return new Response(JSON.stringify({ 
      success: true,
      order: orders[orderIndex]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE /api/orders/[id]
export async function DELETE_ORDER(request: Request, { params }: { params: { id: string } }) {
  try {
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Remove order
    orders.splice(orderIndex, 1)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Helper function to handle different methods for dynamic routes
export async function handler(request: Request, { params }: { params: { id: string } }) {
  const method = request.method

  switch (method) {
    case 'GET':
      return GET_BY_ID(request, { params })
    case 'PATCH':
      return PATCH(request, { params })
    case 'DELETE':
      return DELETE_ORDER(request, { params })
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
  }
}