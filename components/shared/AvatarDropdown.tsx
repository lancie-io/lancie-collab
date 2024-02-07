import Avatar from '@/components/shared/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/auth';
import { LayoutGrid, Monitor, Settings } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import LogOutDropdownItem from './LogOutDropdownItem';

interface AvatarDropdownProps {
  showName?: boolean;
  inApp: boolean;
}

export const LoadingAvatarDropdown = () => {
  return (
    <div className="flex gap-2 items-center max-w-full">
      <Skeleton className="w-8 h-8" />
      <div className="space-y-2">
        <Skeleton className="w-8 h-4" />
        <Skeleton className="w-32 h-2" />
      </div>
    </div>
  );
};

const AvatarDropdown = async ({
  showName = false,
  inApp,
}: AvatarDropdownProps) => {
  const user = await getAuthUser();
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
