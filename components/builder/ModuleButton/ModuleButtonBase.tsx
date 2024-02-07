import { BuilderElement } from '@/components/project/BuilderElements';
import LucideIcon from '@/components/shared/LucideIcon';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ModuleButtonBaseProps extends ButtonProps {
  builderElement: BuilderElement;
}

export const ModuleButtonBase = forwardRef<
  HTMLButtonElement,
  ModuleButtonBaseProps
>(({ builderElement, className, ...props }: ModuleButtonBaseProps, ref) => {
  const { label, icon } = builderElement.buttonComponent;
  return (
    <Button
      variant="muted"
      className={cn(
        'transition duration-150 w-24 md:w-32 h-24 md:h-32 aspect-square border-2 shadow-sm rounded-xl flex flex-col items-center justify-center gap-2 hover:border-ring hover:shadow-lg cursor-grab bg-gradient-to-b from-accent to-muted',
        className
      )}
      ref={ref}
      {...props}
    >
      <LucideIcon name={icon} className="h-6 md:h-8 w-6 md:w-8" />
      <p className="text-xs md:text-sm font-medium">{label}</p>
    </Button>
  );
});

export default ModuleButtonBase;

ModuleButtonBase.displayName = 'ModuleButtonBase';
