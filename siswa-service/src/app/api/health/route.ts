import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();

    return NextResponse.json({
      service: 'siswa-service',
      status: 'success',
      message: 'Database berhasil terhubung dengan Neon',
      timestamp: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      service: 'siswa-service',
      status: 'error',
      message: 'Koneksi gagal terhubung dengan Neon',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
