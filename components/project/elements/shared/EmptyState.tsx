import LucideIcon from '@/components/shared/LucideIcon';
import Title from '@/components/shared/Title';
import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: keyof typeof icons;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const EmptyState = ({
  icon,
  children,
  title,
  description,
  ...props
}: EmptyStateProps) => {
  const { className } = props;
  return (
    <div
      className={cn(
        'cursor-transition duration-100 flex flex-col justify-center items-center border-2 border-dashed rounded-lg bg-muted py-8 hover:brightness-105 px-4 text-center ',
        className
      )}
    >
      <LucideIcon name={icon} className="w-6 h-6 mb-1" />
      <Title className="text-lg mb-0">{title}</Title>
      <p className="text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
};

export default EmptyState;
