import { cn } from '@/lib/utils';
import { AvatarProps as UIAvatarProps } from '@radix-ui/react-avatar';
import { User } from 'lucide-react';
import { AvatarFallback, AvatarImage, UIAvatar } from '../ui/avatar';

interface AvatarProps extends UIAvatarProps {
  data?: {
    image?: string | null;
    name?: string | null;
  };
}

const Avatar = ({ data, ...props }: AvatarProps) => {
  const { className, ...rest } = props;
  return (
    <>
      <UIAvatar className={cn('rounded-full bg-muted', className)} {...rest}>
        <AvatarImage src={data?.image as string | undefined} />
        <AvatarFallback className="uppercase text-xs">
          {data?.name?.slice(0, 2) ?? (
            <User className="w-[60%] h-[60%] text-muted-foreground" />
          )}
        </AvatarFallback>
      </UIAvatar>
    </>
  );
};

export default Avatar;
