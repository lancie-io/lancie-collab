'use client';

import { cn } from '@/lib/utils';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { buttonVariants } from '../ui/button';

interface SidebarLinkProps {
  label: string;
  segment: string;
  href: string;
}

const SidebarLink = ({ label, segment, href }: SidebarLinkProps) => {
  const activeSegments = useSelectedLayoutSegments();
  const isActive = activeSegments[1] ? activeSegments[1] == segment : true;
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'w-full justify-start ',
        isActive && 'bg-foreground text-background hover:bg-foreground/90'
      )}
    >
      <LayoutGrid className="w-5 h-5" />
      {label}
    </Link>
  );
};

export default SidebarLink;
