'use client';

import { cn } from '@/lib/utils';
import { useOthers, useSelf } from '@/liveblocks.config';
import React from 'react';
import Avatar from '../shared/Avatar';

interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarStack = ({ className, ...props }: AvatarStackProps) => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  return (
    <div
      className={cn(
        'flex items-center gap-1 bg-muted rounded-full p-1',
        className
      )}
    >
      <pre>Color: {JSON.stringify(currentUser.info.color)}</pre>
      <Avatar
        className="w-6 h-6 md:w-7 md:h-7"
        key={currentUser.connectionId}
        user={{
          name: currentUser.info.name,
          image: currentUser.info.avatar,
        }}
      />
      {users.slice(0, 3).map(({ connectionId, info }) => {
        const avatarUser = {
          name: info.name,
          image: info.avatar,
        };
        return (
          <Avatar
            key={connectionId}
            user={avatarUser}
            className="w-6 h-6 md:w-7 md:h-7"
          />
        );
      })}
    </div>
  );
};

export default AvatarStack;
