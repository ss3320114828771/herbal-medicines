// app/api/products/route.ts - Fixed for Next.js 15+

// Sample products data
const products = [
  { id: '1', name: 'Black Seed Oil', price: 45.99, stock: 25, category: 'Immune Support', imageUrl: '/n1.jpeg', herbal: true },
  { id: '2', name: 'Organic Honey', price: 64.52, stock: 15, category: 'Digestive Health', imageUrl: '/n2.jpeg', herbal: true }
]

// GET /api/products
export async function GET(request: Request) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  
  let filtered = products
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category)
  }
  
  return Response.json(filtered)
}

// GET /api/products/[id] - Fixed for Next.js 15+
export async function GET_BY_ID(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  
  return Response.json(product)
}

// PUT /api/products/[id] - Fixed for Next.js 15+
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const productIndex = products.findIndex(p => p.id === id)
  
  if (productIndex === -1) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  
  products[productIndex] = { ...products[productIndex], ...body }
  return Response.json({ success: true, product: products[productIndex] })
}

// DELETE /api/products/[id] - Fixed for Next.js 15+
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const productIndex = products.findIndex(p => p.id === id)
  
  if (productIndex === -1) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  
  products.splice(productIndex, 1)
  return Response.json({ success: true })
}