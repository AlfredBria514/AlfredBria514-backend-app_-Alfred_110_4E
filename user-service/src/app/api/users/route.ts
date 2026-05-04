import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'user-service',
    status: 'success',
    message: 'Ini database buat data user'
  });
}
