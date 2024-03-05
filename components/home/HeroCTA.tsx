'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent } from '../providers/Analytics';
import { buttonVariants } from '../ui/button';

const HeroCTA = () => {
  return (
    <Link
      href={'/app'}
      className={cn(
        buttonVariants({ size: 'mega', variant: 'primary' }),
        'animate animate-fade-in-down animate-delay-400'
      )}
      onClick={() => trackEvent('CTA Clicked', { id: 'hero' })}
    >
      Start Creating - It&apos;s free
    </Link>
  );
};

export default HeroCTA;
