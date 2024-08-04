import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Club from '@/lib/models/Club';

export async function POST(request) {
  await connect();
  const { clubId, title, description, images } = await request.json();

  try {
    // Validate input
    if (!clubId || !title || !description || !images || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Missing required fields or images' }, { status: 400 });
    }

    // Find the club by ID
    const club = await Club.findById(clubId);
    if (!club) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    // Create the event
    const event = {
      title,
      description,
      images,
    };

    // Add the event to the club
    await Club.findByIdAndUpdate(
      clubId,
      { $push: { events: event } },
      { new: true }
    );

    return NextResponse.json({ message: 'Event uploaded successfully', event }, { status: 201 });
  } catch (error) {
    console.error('Error uploading event:', error);
    return NextResponse.json({ error: 'Failed to upload event' }, { status: 500 });
  }
}
