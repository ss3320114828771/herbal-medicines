// src/app/api/products/[id]/route.ts - Fixed for Next.js 15+

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Sample data
  const products = {
    '1': { id: '1', name: 'Black Seed Oil', price: 45.99 },
    '2': { id: '2', name: 'Organic Honey', price: 64.52 }
  }
  
  const product = products[id as keyof typeof products]
  
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  
  return Response.json(product)
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  
  return Response.json({ 
    success: true, 
    id, 
    ...body,
    message: `Product ${id} updated`
  })
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  return Response.json({ 
    success: true, 
    message: `Product ${id} deleted` 
  })
}