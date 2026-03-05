// app/api/orders/route.ts - Complete Fixed Version for Next.js 15+

// Sample orders data
const orders = [
  {
    id: '1',
    userId: '1',
    total: 156.50,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    user: { name: 'Ahmed Khan', email: 'ahmed@example.com' },
    items: [
      { id: '101', quantity: 2, price: 45.99, product: { name: 'Black Seed Oil' } },
      { id: '102', quantity: 1, price: 64.52, product: { name: 'Honey with Herbs' } }
    ]
  }
]

// GET /api/orders
export async function GET() {
  return Response.json(orders)
}

// POST /api/orders
export async function POST(request: Request) {
  const body = await request.json()
  const newOrder = {
    id: String(orders.length + 1),
    ...body,
    createdAt: new Date().toISOString()
  }
  orders.push(newOrder)
  return Response.json({ success: true, order: newOrder }, { status: 201 })
}

// GET /api/orders/[id] - FIXED
export async function GET_BY_ID(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const order = orders.find(o => o.id === id)
  
  if (!order) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }
  
  return Response.json(order)
}

// PATCH /api/orders/[id] - FIXED
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()
  const orderIndex = orders.findIndex(o => o.id === id)
  
  if (orderIndex === -1) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }
  
  orders[orderIndex] = { ...orders[orderIndex], ...body }
  return Response.json({ success: true, order: orders[orderIndex] })
}

// DELETE /api/orders/[id] - FIXED
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const orderIndex = orders.findIndex(o => o.id === id)
  
  if (orderIndex === -1) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }
  
  orders.splice(orderIndex, 1)
  return Response.json({ success: true })
}