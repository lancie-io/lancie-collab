'use client';

import { useAuthUser } from '@/lib/auth';
import { trackEvent } from '../providers/Analytics';
import AvatarDropdown from './AvatarDropdown';
import SignInButton from './SignInButton';

const SignInOrAvatar = () => {
  const user = useAuthUser();
  if (!user) {
    return (
      <SignInButton onClick={() => trackEvent('SignInButton Clicked')}>
        Sign In
      </SignInButton>
    );
  }
  return <AvatarDropdown showName={false} inApp={false} />;
};

export default SignInOrAvatar;
