import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const images = await db.orm.public.GalleryImage.all({ orderBy: [{ createdAt: 'desc' }] });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const image = await db.orm.public.GalleryImage.create({
      url: data.url,
      category: data.category || null,
      description: data.description || null,
    });
    return NextResponse.json(image, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}
