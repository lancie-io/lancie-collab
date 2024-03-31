'use client';
import { useAuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent } from '../providers/Analytics';
import SignInButton from '../shared/SignInButton';
import { buttonVariants } from '../ui/button';

const MegaCTA = ({ id, className }: { id: string; className?: string }) => {
  const user = useAuthUser();
  if (!user) {
    return (
      <SignInButton
        variant="primary"
        size="mega"
        onClick={() => trackEvent('CTA Clicked', { id })}
        className={className}
      >
        Start Creating - It&apos;s free
      </SignInButton>
    );
  }
  return (
    <Link
      href={'/app'}
      className={cn(
        buttonVariants({ size: 'mega', variant: 'primary' }),
        className
      )}
      onClick={() => trackEvent('CTA Clicked', { id })}
    >
      Start Creating - It&apos;s free
    </Link>
  );
};

export default MegaCTA;
