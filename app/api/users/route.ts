import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    include: {
      projects: {
        select: {
          id: true,
          name: true,
        },
      },
      files: {
        select: {
          id: true,
          name: true,
          label: true,
          url: true,
        },
      },
      invites: {
        select: {
          id: true,
          toEmail: true,
        },
      },
    },
  });
  return NextResponse.json(users);
}
