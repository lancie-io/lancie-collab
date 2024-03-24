import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
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
  return NextResponse.json(user);
}
