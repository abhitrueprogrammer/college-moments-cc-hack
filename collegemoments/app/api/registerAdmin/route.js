import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import User from '../../../lib/models/User';
import Club from '../../../lib/models/Club';

export async function POST(request) {
  await connect();
  const { email, password, clubName } = await request.json();

  try {
    // Validate input
    if (!email || !password || !clubName) {
      return NextResponse.json({ error: 'Email, password, and club name are required' }, { status: 400 });
    }

    // Find the club
    const club = await Club.findOne({ name: clubName });
    if (!club) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    // Create new admin user
    const user = new User({ email, password, clubIds: [club._id] });
    await user.save();

    // Update club to include new admin
    club.admins.push(user._id);
    await club.save();

    return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering admin:', error);
    return NextResponse.json({ error: 'Failed to register admin' }, { status: 500 });
  }
}
