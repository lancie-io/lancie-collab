'use client';

import { RoomProvider as Room } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { ReactNode } from 'react';
import LoadingBuilder from '../builder/LoadingBuilder';

export function RoomProvider({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <Room id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<LoadingBuilder />}>
        {() => children}
      </ClientSideSuspense>
    </Room>
  );
}
