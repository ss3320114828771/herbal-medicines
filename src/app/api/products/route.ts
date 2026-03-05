// src/app/api/products/route.ts
export async function GET() {
  const products = [
    { id: '1', name: 'Black Seed Oil', price: 45.99 },
    { id: '2', name: 'Organic Honey', price: 64.52 }
  ]
  return Response.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ success: true, product: body })
}