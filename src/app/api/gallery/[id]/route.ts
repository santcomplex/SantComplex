import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.orm.public.GalleryImage.where({ id }).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Gallery API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
