import { getAuthUser } from '@/lib/auth';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import AvatarDropdown from './AvatarDropdown';

const SignInOrAvatar = async () => {
  const user = await getAuthUser();
  if (!user) {
    return (
      <Link
        href="/login"
        className={buttonVariants({ variant: 'primary', size: 'sm' })}
      >
        Sign In
      </Link>
    );
  }
  return <AvatarDropdown showName={false} inApp={false} />;
};

export default SignInOrAvatar;
