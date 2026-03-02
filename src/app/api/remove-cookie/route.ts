import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  // Remove cookie by overwriting it with maxAge: 0
  res.cookies.delete('accessToken');

  return res;
}
