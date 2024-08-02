// pages/api/signup.js
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()

  // Perform sign-up logic (example logic)
  if (email && password) {
    // For example, save user to a database
    return NextResponse.json({ success: true, message: 'Signup successful' })
  } else {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
  }
}
