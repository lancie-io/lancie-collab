import { cn } from '@/lib/utils';
import { ModalCloseButton } from './ModalCloseButton';

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalHeader({ children, ...props }: ModalHeaderProps) {
  const { className } = props;
  return (
    <div
      className={cn(
        'drag sticky top-0 z-10 -mb-4  bg-background p-4 md:-mb-6 md:p-6 space-y-1',
        className
      )}
      id="modal-header"
    >
      <ModalCloseButton className="absolute right-5 top-5 -translate-y-1/2 translate-x-1/2 md:right-6 md:top-6" />
      {children}
    </div>
  );
}
