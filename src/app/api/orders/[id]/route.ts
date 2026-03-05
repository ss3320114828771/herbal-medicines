// src/app/api/orders/[id]/route.ts - Fixed for Next.js 15+

// GET /api/orders/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Sample data
  const orders = {
    '1': { id: '1', total: 156.50, status: 'PENDING' },
    '2': { id: '2', total: 89.99, status: 'DELIVERED' }
  }
  
  const order = orders[id as keyof typeof orders]
  
  if (!order) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }
  
  return Response.json(order)
}

// PATCH /api/orders/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  
  return Response.json({ 
    success: true, 
    id, 
    ...body,
    message: `Order ${id} updated`
  })
}

// DELETE /api/orders/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  return Response.json({ 
    success: true, 
    message: `Order ${id} deleted` 
  })
}