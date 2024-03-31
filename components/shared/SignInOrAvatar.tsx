'use client';

import { useAuthUser } from '@/lib/auth';
import AvatarDropdown from './AvatarDropdown';
import SignInButton from './SignInButton';

const SignInOrAvatar = () => {
  const user = useAuthUser();
  if (!user) {
    return <SignInButton />;
  }
  return <AvatarDropdown showName={false} inApp={false} />;
};

export default SignInOrAvatar;
