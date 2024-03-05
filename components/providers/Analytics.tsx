'use client';
import { analytics } from '@/lib/segment';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPage();
  }, [pathname, searchParams]);

  return null;
};

export default Analytics;

export const trackPage = () => {
  analytics.page();
  // toast.success(`Page Viewed`);
};

export const trackEvent = (eventName: string, properties?: Object) => {
  analytics.track(eventName, { ...properties });
  // toast.success(`${eventName}`);
};
