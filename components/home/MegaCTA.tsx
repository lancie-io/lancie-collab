'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent } from '../providers/Analytics';
import { buttonVariants } from '../ui/button';

const MegaCTA = ({ id }: { id: string }) => {
  return (
    <Link
      href="/app"
      className={cn(
        buttonVariants({
          variant: 'primary',
          size: 'mega',
        }),
        'relative z-10 mt-4 md:mt-8'
      )}
      onClick={() => trackEvent('CTA Clicked', { id })}
    >
      Start Project - It&apos;s free
    </Link>
  );
};

export default MegaCTA;
