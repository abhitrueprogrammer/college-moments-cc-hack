import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Club from '../../../lib/models/Club';

export async function POST(request) {
  await connect();
  const { clubId, title, description, images } = await request.json();
  const user = request.user;

  try {
    // Validate input
    if (!clubId || !title || !description || !images || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Club ID, title, description, and images are required' }, { status: 400 });
    }

    // Find the club
    const club = await Club.findById(clubId);
    if (!club) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    // Check if user is an admin
    if (!club.admins.includes(user._id)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Add event
    club.events.push({ title, description, images });
    await club.save();

    return NextResponse.json({ message: 'Event uploaded successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error uploading event:', error);
    return NextResponse.json({ error: 'Failed to upload event' }, { status: 500 });
  }
}
