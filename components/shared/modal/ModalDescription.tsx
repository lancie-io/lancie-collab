import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'pointer-events-none text-muted-foreground text-sm',
      className
    )}
    {...props}
  />
));

ModalDescription.displayName = 'ModalDescription';
