import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import User from '../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connect();
  const { email, password } = await request.json();

  try {
    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({
      message: 'Login successful',
      token,
      email: user.email,
      clubIds: user.clubIds,
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
