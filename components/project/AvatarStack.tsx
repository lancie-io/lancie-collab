'use client';

import { useOthers, useSelf } from '@/liveblocks.config';

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  return (
    <div>
      {/* {users.slice(0, 3).map(({ connectionId, info }) => {
        return <Avatar key={connectionId} src={info.avatar} name={info.name} />;
      })} */}
    </div>
  );
};

export default AvatarStack;
