// app/api/uploadAnnouncement/route.js
import { NextResponse } from 'next/server';
// import connect from '../../../lib/db';
// import connect from '@/lib/db';
import connect from "../../../lib/db"
// import Club from '../../../models/Club';
// import Club from '@/lib/models/Club';
import Club from "../../../lib/models/Club"
// import User from '../../../models/User';
// import User from '@/lib/models/User';
import User from "../../../lib/models/User"

export async function POST(request) {
  await connect();
  const { userId, clubId, announcement } = await request.json();

  try {
    const user = await User.findById(userId);
    if (!user.clubIds.includes(clubId)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    await Club.findByIdAndUpdate(
      clubId,
      { $push: { announcements: announcement } },
      { new: true }
    );

    return NextResponse.json({ message: 'Announcement uploaded successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
