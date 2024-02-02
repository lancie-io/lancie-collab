import Avatar from '@/components/shared/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/auth';
import { LayoutGrid, Monitor } from 'lucide-react';
import Link from 'next/link';
import LogOutDropdownItem from './LogOutDropdownItem';

interface AvatarDropdownProps {
  showName?: boolean;
  inApp: boolean;
}

const AvatarDropdown = async ({
  showName = false,
  inApp,
}: AvatarDropdownProps) => {
  const user = await getAuthUser();

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
        <Avatar data={user} className="w-8 h-8" />
        {showName && (
          <div className="font-medium text-sm whitespace-nowrap text-ellipsis overflow-hidden">
            {user?.name}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>{renderFirstLink()}</DropdownMenuItem>
        <LogOutDropdownItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
