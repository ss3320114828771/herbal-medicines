// src/app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return Response.json({ id, name: `Product ${id}`, price: 45.99 })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()
  return Response.json({ success: true, id, ...body })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return Response.json({ success: true })
}