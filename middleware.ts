import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
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
}
