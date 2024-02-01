import { getAuthUser } from '@/lib/auth';
import { Button } from '../ui/button';
import Avatar from './Avatar';

const SignInOrAvatar = async () => {
  const user = await getAuthUser();
  if (!user) {
    return (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    );
  }
  return <Avatar data={user} className="w-9 h-9" />;
};

export default SignInOrAvatar;
