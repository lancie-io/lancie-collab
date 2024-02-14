'use client';
import { useSession } from 'next-auth/react';
import SidebarLink from './SidebarLink';

const SidebarMenu = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="mt-4">
      <SidebarLink label="Projects" segment="/" href={`/app/${user?.id}`} />
    </div>
  );
};

export default SidebarMenu;
