import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  // && !path.startsWith('/app/project')
  if (path.startsWith('/app')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      const newUrl = new URL(
        `/login${
          path !== '/' ? `?callbackUrl=${encodeURIComponent(path)}` : ''
        }`,
        req.nextUrl.href
      );
      return NextResponse.redirect(newUrl);
    }
  }
  // if (path.startsWith('/app/project/')) {
  //   return NextResponse.next({
  //     request: {
  //       // Apply new request headers
  //       headers: requestHeaders,
  //     },
  //   });
  // }
}
