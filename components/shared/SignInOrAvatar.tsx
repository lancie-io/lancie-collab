import { getAuthUser } from '@/lib/auth';
import AvatarDropdown from './AvatarDropdown';
import SignInButton from './SignInButton';

const SignInOrAvatar = async () => {
  const user = await getAuthUser();
  if (!user) {
    return <SignInButton />;
  }
  return <AvatarDropdown showName={false} inApp={false} />;
};

export default SignInOrAvatar;
