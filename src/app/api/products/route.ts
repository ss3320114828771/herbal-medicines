// src/app/api/orders/route.ts
export async function GET() {
  const orders = [
    { id: '1', total: 156.50, status: 'PENDING' },
    { id: '2', total: 89.99, status: 'DELIVERED' }
  ]
  return Response.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ success: true, order: body })
}