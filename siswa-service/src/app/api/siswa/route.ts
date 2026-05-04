import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'siswa-service',
    status: 'success',
    message: 'Ini database buat data siswa'
  });
}
