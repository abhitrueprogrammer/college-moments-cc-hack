// app/api/registerClub/route.js
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Club from '@/lib/models/Club';

export async function POST(request) {
  await connect();
  const { name, description } = await request.json();

  try {
    const newClub = await Club.create({
      name,
      description,
      admins: [],
      announcements: [],
      events: []
    });

    return NextResponse.json({ message: 'Club registered successfully', clubId: newClub._id }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code in MongoDB
      return NextResponse.json({ error: 'A club with this name already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
