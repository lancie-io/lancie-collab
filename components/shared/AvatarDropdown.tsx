'use client';

import Avatar from '@/components/shared/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUser } from '@/lib/auth';
import { LayoutGrid, Monitor, Settings } from 'lucide-react';
import Link from 'next/link';
import LogOutDropdownItem from './LogOutDropdownItem';

interface AvatarDropdownProps {
  showName?: boolean;
  inApp: boolean;
}

const AvatarDropdown = ({ showName = false, inApp }: AvatarDropdownProps) => {
  const user = useAuthUser();
  if (!user) {
    return;
  }

  function renderFirstLink() {
    if (inApp) {
      return (
        <Link href="/">
          <Monitor className="mr-2 h-4 w-4" />
          Website
        </Link>
      );
    }
    return (
      <Link href={`/app/${user?.id}`}>
        <LayoutGrid className="mr-2 h-4 w-4" />
        App
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center max-w-full">
        <Avatar user={user} className="w-8 h-8" />
        {showName && (
          <div className="font-medium text-sm leading-[1.1] whitespace-nowrap text-ellipsis text-left overflow-hidden">
            {user?.name}
            <br />
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>{renderFirstLink()}</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/app/${user.id}/settings`}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <LogOutDropdownItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
