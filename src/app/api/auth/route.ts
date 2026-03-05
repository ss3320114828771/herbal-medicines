// src/app/api/auth/route.ts - Fixed for Next.js 15+

// Simple users data
const users = [
  {
    id: '1',
    email: 'sajidsyedhafizsajidsyed@gmail.com',
    password: 'admin123',
    name: 'Hafiz Sajid Syed',
    role: 'ADMIN'
  }
]

// POST /api/auth - Login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find(u => u.email === email)

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check password
    if (user.password !== password) {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Return success without token (simplified)
    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// GET /api/auth - Check auth status
export async function GET() {
  // Simplified - return null user
  return Response.json({ user: null })
}

// DELETE /api/auth - Logout
export async function DELETE() {
  return Response.json({ success: true })
}