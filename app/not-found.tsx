'use client';
import SiteHeader from '@/components/layout/SiteHeader';
import { trackEvent } from '@/components/providers/Analytics';
import Title from '@/components/shared/Title';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const path = usePathname();
  useEffect(() => {
    trackEvent('Error Occurred', {
      type: '404 Error',
      message: 'User tried to access page that does not exist',
      info: path,
    });
  }, []);
  return (
    <div className="grow flex flex-col items-center justify-center text-center">
      <SiteHeader blank className="absolute top-0 w-full" />
      <Title className="text-5xl">404</Title>
      <p className="text-muted-foreground mt-2 mb-4">
        Could not find requested page.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: 'primary' }))}>
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
