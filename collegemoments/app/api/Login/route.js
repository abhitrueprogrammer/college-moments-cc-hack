// pages/api/login.js
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()

  // Validate email and password (example logic)
  if (email === 'test@example.com' && password === 'password') {
    return NextResponse.json({ success: true, message: 'Login successful' })
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  }
}
