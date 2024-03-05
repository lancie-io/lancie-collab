'use client';
import Link from 'next/link';
import { trackEvent } from '../providers/Analytics';
import { buttonVariants } from '../ui/button';

const SignInButton = () => {
  return (
    <Link
      href="/login"
      className={buttonVariants({ variant: 'primary', size: 'sm' })}
      onClick={() => trackEvent('Sign In Button Clicked')}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
