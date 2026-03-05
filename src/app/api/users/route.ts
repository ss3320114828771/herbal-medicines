// app/api/users/route.ts - Complete Fixed Version for Next.js 15+

// Sample users data
const users = [
  { id: '1', email: 'sajidsyedhafizsajidsyed@gmail.com', name: 'Hafiz Sajid Syed', role: 'ADMIN' },
  { id: '2', email: 'ahmed@example.com', name: 'Ahmed Khan', role: 'CUSTOMER' }
]

// GET /api/users
export async function GET() {
  return Response.json(users)
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json()
  const newUser = {
    id: String(users.length + 1),
    ...body,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  return Response.json({ success: true, user: newUser }, { status: 201 })
}

// GET /api/users/[id] - FIXED
export async function GET_BY_ID(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const user = users.find(u => u.id === id)
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  return Response.json(user)
}

// PUT /api/users/[id] - FIXED
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()
  const userIndex = users.findIndex(u => u.id === id)
  
  if (userIndex === -1) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  users[userIndex] = { ...users[userIndex], ...body }
  return Response.json({ success: true, user: users[userIndex] })
}

// DELETE /api/users/[id] - FIXED
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const userIndex = users.findIndex(u => u.id === id)
  
  if (userIndex === -1) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  users.splice(userIndex, 1)
  return Response.json({ success: true })
}