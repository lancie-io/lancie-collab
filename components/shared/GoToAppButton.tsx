import { getAuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ButtonProps, buttonVariants } from '../ui/button';

interface GoToAppButtonProps extends ButtonProps {
  href?: string;
}

const GoToAppButton = async ({
  className,
  size = 'default',
  href = '/app',
  children,
}: GoToAppButtonProps) => {
  const user = await getAuthUser();
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'default', size: size }),
        className
      )}
    >
      {user ? 'Open App' : children || 'Login'}
    </Link>
  );
};

export default GoToAppButton;
