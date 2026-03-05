// src/app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  return Response.json({ id, name: `User ${id}` })
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
  return Response.json({ success: true, message: `User ${id} deleted` })
}