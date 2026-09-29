import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  if (url.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    
    const USERNAME = 'admin';
    const PASSWORD = process.env.ADMIN_PASSWORD || 'santcomplex2026'; 
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      
      if (user === USERNAME && pwd === PASSWORD) {
        return NextResponse.next();
      }
    }
    
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sant Complex Admin Panel"',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
