import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const HeroCTA = () => {
  return (
    <Link
      href={'/app'}
      className={cn(
        buttonVariants({ size: 'mega', variant: 'primary' }),
        'animate animate-fade-in-down animate-delay-400'
      )}
    >
      Start Creating
    </Link>
  );
};

export default HeroCTA;
