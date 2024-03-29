import { Icons } from '@/components/shared/Icons';
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
        'flex flex-col justify-center items-center py-12 md:py-24 px-4 text-center w-full',
        className
      )}
    >
      <div className="relative flex flex-col items-center">
        <Icons.arrow className="absolute left-0 top-0 translate-x-1/4 w-16 lg:w-24 md:-translate-y-1/2 rotate-[25deg] lg:rotate-[0deg] lg:-translate-x-1/4 xl:rotate-[-10deg]  fill-foreground" />
        <LucideIcon name={icon} className="w-8 h-8 mb-2" />
        <Title className="text-xl mb-1">{title}</Title>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default EmptyState;
