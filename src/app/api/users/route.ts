// app/api/users/route.ts - Fixed for Next.js 15+

// Sample users data
const users = [
  { id: '1', email: 'sajid.syed@gmail.com', name: 'Hafiz Sajid Syed', role: 'ADMIN' },
  { id: '2', email: 'ahmed@example.com', name: 'Ahmed Khan', role: 'CUSTOMER' }
]

// GET /api/users
export async function GET() {
  return Response.json(users)
}

// GET /api/users/[id] - Fixed for Next.js 15+
export async function GET_BY_ID(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = users.find(u => u.id === id)
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  return Response.json(user)
}

// PUT /api/users/[id] - Fixed for Next.js 15+
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const userIndex = users.findIndex(u => u.id === id)
  
  if (userIndex === -1) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  users[userIndex] = { ...users[userIndex], ...body }
  return Response.json({ success: true, user: users[userIndex] })
}

// DELETE /api/users/[id] - Fixed for Next.js 15+
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userIndex = users.findIndex(u => u.id === id)
  
  if (userIndex === -1) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  users.splice(userIndex, 1)
  return Response.json({ success: true })
}