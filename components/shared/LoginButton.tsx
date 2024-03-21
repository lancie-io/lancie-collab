'use client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { trackEvent } from '../providers/Analytics';
import { Button, ButtonProps } from '../ui/button';

interface LoginButtonProps extends ButtonProps {
  children: React.ReactNode;
  provider: 'google' | 'email';
}

const LoginButton = ({ children, provider, ...props }: LoginButtonProps) => {
  const { className, ...rest } = props;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    const newUrl = new URL(
      callbackUrl || `${process.env.NEXT_PUBLIC_HOST_URL}/app`
    );
    newUrl.searchParams.set('login_success', 'true');
    trackEvent('LoginButton Clicked', { provider });
    signIn(provider, {
      callbackUrl: newUrl.toString(),
    });
    return () => setLoading(false);
  };
  return (
    <Button
      {...rest}
      onClick={handleClick}
      className={cn('flex gap-1.5 justify-center', className)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {loading ? 'Logging in...' : children}
    </Button>
  );
};

export default LoginButton;
