import { cn } from '@/lib/utils';
import { AvatarProps as UIAvatarProps } from '@radix-ui/react-avatar';
import { Loader2, User } from 'lucide-react';
import { AvatarFallback, AvatarImage, UIAvatar } from '../ui/avatar';

interface AvatarProps extends UIAvatarProps {
  user?: {
    image?: string | null;
    name?: string | null;
  } | null;
  loading?: boolean;
}

const Avatar = ({ user, loading, ...props }: AvatarProps) => {
  const { className, ...rest } = props;
  return (
    <>
      <UIAvatar
        className={cn(
          'rounded-full bg-muted grid place-items-center',
          className,
          loading && 'opacity-50'
        )}
        {...rest}
      >
        {loading && <Loader2 className="w-1/2 h-1/2 animate-spin absolute" />}
        {user?.image && <AvatarImage src={user.image} />}
        <AvatarFallback className="uppercase text-xs bg-border">
          {user?.name?.slice(0, 1) || (
            <User className="w-1/2 h-1/2 text-muted-foreground" />
          )}
        </AvatarFallback>
      </UIAvatar>
    </>
  );
};

export default Avatar;
