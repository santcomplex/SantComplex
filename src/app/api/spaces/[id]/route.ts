import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const space = await db.orm.public.Space.where({ id }).update({
        unitNumber: data.unitNumber,
        floor: data.floor,
        area: data.area || null,
        monthlyRent: data.monthlyRent ? parseFloat(data.monthlyRent) : null,
        status: data.status,
        basicFacilities: data.basicFacilities || null,
        photoUrl: data.photoUrl || null,
    });
    return NextResponse.json(space);
  } catch {
    return NextResponse.json({ error: 'Failed to update space' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.orm.public.Space.where({ id }).delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete space' }, { status: 500 });
  }
}
