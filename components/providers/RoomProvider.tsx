'use client';

import { RoomProvider as Room } from '@/liveblocks.config';
import { LiveList } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react';
import { Prisma } from '@prisma/client';
import { ReactNode } from 'react';
import LoadingBuilder from '../builder/LoadingBuilder';

export function RoomProvider({
  children,
  roomId,
  initialElements,
}: {
  children: ReactNode;
  roomId: string;
  initialElements: Prisma.ProjectGetPayload<{}>['content'];
}) {
  const parsedElements = JSON.parse(initialElements as string) || [];

  return (
    <Room
      id={roomId}
      initialPresence={{}}
      initialStorage={{
        elements: new LiveList([...parsedElements]),
      }}
    >
      <ClientSideSuspense fallback={<LoadingBuilder />}>
        {() => children}
      </ClientSideSuspense>
    </Room>
  );
}
