'use client';
import { useAuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent } from '../providers/Analytics';
import SignInButton from '../shared/SignInButton';
import { buttonVariants } from '../ui/button';

const HeroCTA = () => {
  const user = useAuthUser();
  if (!user) {
    return (
      <SignInButton
        variant="primary"
        size="mega"
        className="animate animate-fade-in-down animate-delay-600"
        onClick={() => trackEvent('CTA Clicked', { id: 'hero' })}
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
        'animate animate-fade-in-down animate-delay-600'
      )}
      onClick={() => trackEvent('CTA Clicked', { id: 'hero' })}
    >
      Start Creating - It&apos;s free
    </Link>
  );
};

export default HeroCTA;
