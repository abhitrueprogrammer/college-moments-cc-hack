import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';
import connect from '@/lib/db';

export async function middleware(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connect();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    request.user = user;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
}

export const config = {
  matcher: ['/api/uploadAnnouncement', '/api/uploadEvent'],
};
