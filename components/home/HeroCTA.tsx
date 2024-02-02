import { getAuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const HeroCTA = async () => {
  const user = await getAuthUser();
  return (
    <Link
      href={user ? '/app' : '/login'}
      className={cn(buttonVariants({ size: 'mega', variant: 'primary' }))}
    >
      Get Started
    </Link>
  );
};

export default HeroCTA;
