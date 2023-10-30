import Avatar from '@/components/shared/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/auth';
import { Monitor } from 'lucide-react';
import Link from 'next/link';
import LogOutDropdownItem from './LogOutDropdownItem';

const AvatarDropdown = async () => {
  const user = await getAuthUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center">
        <Avatar data={user} className="w-8 h-8" />
        <span className="font-medium text-sm">{user?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/">
            <Monitor className="mr-2 h-4 w-4" />
            Website
          </Link>
        </DropdownMenuItem>
        <LogOutDropdownItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
