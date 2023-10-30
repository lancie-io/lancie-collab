'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { DropdownMenuItem } from '../ui/dropdown-menu';

const LogOutDropdownItem = () => {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
};

export default LogOutDropdownItem;
