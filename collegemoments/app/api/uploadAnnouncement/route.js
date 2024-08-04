import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import Club from '../../../lib/models/Club';

export async function POST(request) {
  await connect();
  const { clubId, announcement, image } = await request.json();
  const user = request.user;

  try {
    // Validate input
    if (!clubId || !announcement || !image) {
      return NextResponse.json({ error: 'Club ID, announcement, and image are required' }, { status: 400 });
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

    // Add announcement
    club.announcements.push({ text: announcement, image });
    await club.save();

    return NextResponse.json({ message: 'Announcement uploaded successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error uploading announcement:', error);
    return NextResponse.json({ error: 'Failed to upload announcement' }, { status: 500 });
  }
}
