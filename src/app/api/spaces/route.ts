import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const spaces = await db.orm.public.Space.all({ orderBy: [{ floor: 'asc' }, { unitNumber: 'asc' }] });
    return NextResponse.json(spaces);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch spaces' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const space = await db.orm.public.Space.create({
      unitNumber: data.unitNumber,
      floor: data.floor,
      area: data.area || null,
      monthlyRent: data.monthlyRent ? parseFloat(data.monthlyRent) : null,
      status: 'AVAILABLE',
      basicFacilities: data.basicFacilities || null,
      photoUrl: data.photoUrl || null,
    });
    return NextResponse.json(space, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create space' }, { status: 500 });
  }
}
