import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '../ui/button';

interface MegaButtonProps extends ButtonProps {}

const MegaButton = ({
  children,
  variant,
  className,
  ...props
}: MegaButtonProps) => {
  return (
    <Button
      variant={variant || 'primary'}
      className={cn('h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl', className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MegaButton;
