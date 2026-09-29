'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'santcomplex2026';
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    redirect('/admin');
  } else {
    return { error: 'Invalid password. Please try again.' };
  }
}
