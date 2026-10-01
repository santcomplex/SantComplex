import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const business = await db.orm.public.Business.where({ id }).update({
        name: data.name,
        category: data.category,
        floor: data.floor,
        unit: data.unit || null,
        logoUrl: data.logoUrl || null,
        description: data.description || null,
        contactInfo: data.contactInfo || null,
        isHidden: data.isHidden ?? false,
    });
    return NextResponse.json(business);
  } catch {
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.orm.public.Business.where({ id }).delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete business' }, { status: 500 });
  }
}
