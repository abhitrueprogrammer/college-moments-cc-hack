import { NextResponse } from 'next/server';
import connect from '@/lib/db'; // Ensure this path is correct for your setup
import User from '@/lib/models/User'; // Ensure this path is correct for your setup
import Club from '@/lib/models/Club'; // Ensure this path is correct for your setup
import bcrypt from 'bcryptjs';

export async function GET(request) {
  await connect();
  const { email, password } = await request.json();

  try {
    // Find the user by email
    const user = await User.findOne({ email }).populate('clubIds'); // Populate clubIds to get club details

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Extract club names from populated clubIds
    const clubNames = await Promise.all(
      user.clubIds.map(async (club) => {
        const clubDoc = await Club.findById(club._id);
        return clubDoc ? clubDoc.name : 'Unknown Club';
      })
    );

    // Return success response with user info and club names
    return NextResponse.json({ 
      message: 'Login successful', 
      email: user.email, 
      clubs: clubNames 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
