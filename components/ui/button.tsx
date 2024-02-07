import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex gap-1.5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-b from-brand-400 to-brand-600 text-white',
        default: 'bg-foreground text-background hover:bg-foreground/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        muted: 'bg-muted hover:bg-accent border hover:border-ring',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline',
        silent: 'bg-transparent text-muted-foreground hover:text-foreground',
        list: 'bg-transparent text-muted-foreground hover:text-foreground',
        none: 'bg-transparent border-none',
      },
      size: {
        default: 'h-10 px-4 py-2',
        s: 'h-8 px-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        iconSmall: 'h-8 w-8',
        iconXS: 'h-6 w-6',
        mega: 'h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
