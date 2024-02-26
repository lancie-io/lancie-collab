import { View } from '@/components/providers/ViewProvider';
import { headers } from 'next/headers';

export function getSearchParams() {
  const url = new URL(headers().get('x-url')!);
  return url.searchParams;
}

export function getMode() {
  return getSearchParams().get('mode') as View | null;
}

export function getPathname(): string | null {
  const url = new URL(headers().get('x-url')!);
  return url.pathname;
}
