'use client';

import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { ReactNode } from 'react';

export function RoomWrapper({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  console.log('room rendered');
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
