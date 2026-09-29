import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const businesses = await db.orm.public.Business.all({
      orderBy: [{ name: 'asc' }],
    });
    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch businesses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const business = await db.orm.public.Business.create({
      name: data.name,
      category: data.category,
      floor: data.floor,
      unit: data.unit || null,
      logoUrl: data.logoUrl || null,
      description: data.description || null,
      contactInfo: data.contactInfo || null,
      isHidden: false,
    });
    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  }
}
