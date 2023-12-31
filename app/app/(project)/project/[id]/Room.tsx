'use client';

import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { ReactNode } from 'react';

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
