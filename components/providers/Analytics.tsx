'use client';
import { getLocalStorage } from '@/lib/hooks/useLocalStorage';
import { analytics } from '@/lib/segment';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
  const showTrackingEventToast = getLocalStorage('show-tracking-event-toast');
  if (showTrackingEventToast) {
    toast.success(`Page Viewed`);
  }
};

export const trackEvent = (eventName: string, properties?: Object) => {
  analytics.track(eventName, { ...properties });
  const showTrackingEventToast = getLocalStorage('show-tracking-event-toast');
  if (showTrackingEventToast) {
    toast.success(`${eventName}`);
  }
};
