'use client';
import { useAuthUser } from '@/lib/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { trackEvent, trackIdentify } from './providers/Analytics';

export const removeURLParameter = (url: string, parameter: string) => {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return pars.length > 0 ? '?' + pars.join('&') : '';
  }
  return url;
};

const PathWatcher = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    const loginSuccess = searchParams.get('login_success');
    const logoutSuccess = searchParams.get('logout_success');
    if (loginSuccess === 'true' || logoutSuccess === 'true') {
      if (user) {
        console.log('TRIGGER');
        trackIdentify(user.email, {
          name: user.name,
          email: user.email,
        });
        trackEvent('Signed In');
        toast.success(`Logged in as ${user.email}`);
      }
      if (logoutSuccess === 'true') {
        trackEvent('Signed Out');
        toast.info('Logged out');
      }
      let url = new URL(`${process.env.NEXT_PUBLIC_HOST_URL}${pathname}`);
      const newURL = removeURLParameter(`${url}`, 'login_success');
      router.replace(newURL, { scroll: false });
    }
  }, [searchParams, user]);
  return null;
};

export default PathWatcher;
