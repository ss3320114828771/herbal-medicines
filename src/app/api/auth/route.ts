// src/app/api/auth/route.ts
export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  if (email === 'sajidsyedhafizsajidsyed@gmail.com' && password === 'admin123') {
    return Response.json({
      success: true,
      user: {
        id: '1',
        email,
        name: 'Hafiz Sajid Syed',
        role: 'ADMIN'
      }
    })
  }
  
  return Response.json({ error: 'Invalid credentials' }, { status: 401 })
}

export async function GET() {
  return Response.json({ user: null })
}

export async function DELETE() {
  return Response.json({ success: true })
}