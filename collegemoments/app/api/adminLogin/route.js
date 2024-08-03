// app/api/adminLogin/route.js
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/User';
import Club from '@/lib/models/Club';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connect();
  const { email, password } = await request.json();

  try {
    // Find the user by email and populate clubIds
    const user = await User.findOne({ email }).populate('clubIds');

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Extract club details from populated clubIds
    const clubs = user.clubIds.map(club => ({
      id: club._id.toString(),
      name: club.name
    }));

    // Return success response with user info and club details
    return NextResponse.json({
      message: 'Login successful',
      email: user.email,
      clubs
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
