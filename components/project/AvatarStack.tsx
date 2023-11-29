'use client';

import { useOthers, useSelf } from '@/liveblocks.config';
import Avatar from '../shared/Avatar';

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  return (
    <div className="flex items-center gap-1">
      <Avatar
        className="w-8 h-8"
        key={currentUser.connectionId}
        data={{
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
          <Avatar key={connectionId} data={avatarUser} className="w-8 h-8" />
        );
      })}
    </div>
  );
};

export default AvatarStack;
