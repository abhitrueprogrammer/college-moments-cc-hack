import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Club from '../../../lib/models/Club';
import User from '../../../lib/models/User';

export async function POST(request) {
  await connect();
  const { name, description, admins } = await request.json();

  try {
    // Validate input
    if (!name) {
      return NextResponse.json({ error: 'Club name is required' }, { status: 400 });
    }

    // Create the new club
    const club = await Club.create({ name, description, admins: [] });

    // Add admins to the club
    if (admins && admins.length > 0) {
      for (const email of admins) {
        const user = await User.findOne({ email });
        if (user) {
          user.clubIds.push(club._id);
          user.role = 'admin';
          await user.save();
          club.admins.push(user._id);
        }
      }
      await club.save();
    }

    return NextResponse.json({ message: 'Club registered successfully', club }, { status: 201 });
  } catch (error) {
    console.error('Error registering club:', error);
    return NextResponse.json({ error: 'Failed to register club' }, { status: 500 });
  }
}
