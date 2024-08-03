// app/api/registerAdmin/route.js
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/lib/models/User';
import Club from '@/lib/models/Club';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connect();
  const { email, password, clubId } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      clubIds: [clubId], // Save the clubId here
      role: 'admin'
    });

    await Club.findByIdAndUpdate(
      clubId,
      { $push: { admins: newUser._id } },
      { new: true }
    );

    return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
