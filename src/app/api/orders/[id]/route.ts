// src/app/api/orders/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return Response.json({ id, message: `Order ${id} details` })
}

export async function PATCH(
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
  return Response.json({ success: true, message: `Order ${id} deleted` })
}