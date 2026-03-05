// src/app/api/users/route.ts
export async function GET() {
  const users = [
    { id: '1', name: 'Hafiz Sajid Syed', email: 'sajidsyedhafizsajidsyed@gmail.com' }
  ]
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ success: true, user: body })
}