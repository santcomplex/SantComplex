import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const enquiries = await db.orm.public.Enquiry.orderBy((e) => e.createdAt.desc()).all();
    return NextResponse.json(enquiries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const enquiry = await db.orm.public.Enquiry.create({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      message: data.message,
      status: 'NEW',
    });
    return NextResponse.json(enquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}
