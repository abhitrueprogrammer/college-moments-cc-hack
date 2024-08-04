import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Club from '@/lib/models/Club';

export async function POST(request) {
  await connect();
  const { clubId, title, description, image } = await request.json();

  try {
    // Validate input
    if (!clubId || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find the club by ID
    const club = await Club.findById(clubId);
    if (!club) {
      return NextResponse.json({ error: 'Club not found' }, { status: 403 });
    }

    // Create the announcement
    const announcement = {
      title,
      description,
      image,
    };

    // Add the announcement to the club
    await Club.findByIdAndUpdate(
      clubId,
      { $push: { announcements: announcement } },
      { new: true }
    );

    return NextResponse.json({ message: 'Announcement uploaded successfully', announcement }, { status: 201 });
  } catch (error) {
    console.error('Error uploading announcement:', error);
    return NextResponse.json({ error: 'Failed to upload announcement' }, { status: 500 });
  }
}
