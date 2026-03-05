// app/api/auth/route.ts
// Super ultra simplified version - Fixed for Next.js 15+ and Vercel deployment

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Simple hardcoded users for demo
    const users = [
      {
        id: '1',
        email: 'sajidsyedhafizsajidsyed@gmail.com',
        password: 'admin123',
        name: 'Hafiz Sajid Syed',
        role: 'ADMIN'
      },
      {
        id: '2',
        email: 'customer@test.com',
        password: 'customer123',
        name: 'Test Customer',
        role: 'CUSTOMER'
      }
    ]

    // Find user
    const user = users.find(u => u.email === email)

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Simple password check
    if (user.password !== password) {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create simple token (base64 encoded)
    const token = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    }))

    // Set cookie manually
    return Response.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    )

  } catch (error) {
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // Get cookie from header
    const cookieHeader = request.headers.get('cookie') || ''
    const tokenCookie = cookieHeader.split(';').find(c => c.trim().startsWith('token='))
    
    if (!tokenCookie) {
      return Response.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const token = tokenCookie.split('=')[1]
    
    // Decode token (base64)
    try {
      const userData = JSON.parse(atob(token))
      
      // Check if expired
      if (userData.exp < Date.now()) {
        return Response.json(
          { error: 'Token expired' },
          { status: 401 }
        )
      }

      return Response.json(
        { 
          user: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          }
        },
        { status: 200 }
      )
    } catch {
      return Response.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Clear cookie by setting expired date
  return Response.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax'
      }
    }
  )
}