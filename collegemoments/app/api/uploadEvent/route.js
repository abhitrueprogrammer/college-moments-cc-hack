// app/api/uploadEvent/route.js
import { NextResponse } from 'next/server';
// import connect from '../../../lib/db';
import connect from '@/lib/db';
// import Event from '../../../models/Event';
import Event from '@/lib/models/Event';
// import Club from '../../../models/Club';
import Club from '@/lib/models/Club';
// import User from '../../../models/User';
import User from '@/lib/models/User';

export async function POST(request) {
  await connect();
  const { userId, clubId, eventName, eventDescription, eventImages } = await request.json();

  try {
    const user = await User.findById(userId);
    if (!user.clubIds.includes(clubId)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const newEvent = await Event.create({
      clubId,
      name: eventName,
      description: eventDescription,
      images: eventImages
    });

    await Club.findByIdAndUpdate(
      clubId,
      { $push: { events: newEvent._id } },
      { new: true }
    );

    return NextResponse.json({ message: 'Event uploaded successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
