// src/app/api/users/[id]/route.ts - Fixed for Next.js 15+

// GET /api/users/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Sample data
  const users = {
    '1': { id: '1', name: 'Hafiz Sajid Syed', email: 'sajidsyedhafizsajidsyed@gmail.com', role: 'ADMIN' }
  }
  
  const user = users[id as keyof typeof users]
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  return Response.json(user)
}

// PUT /api/users/[id]
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
    message: `User ${id} updated`
  })
}

// DELETE /api/users/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  return Response.json({ 
    success: true, 
    message: `User ${id} deleted` 
  })
}