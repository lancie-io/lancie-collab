import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';
import React from 'react';
import LucideIcon from '../shared/LucideIcon';

interface ModuleButtonReplicaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon: keyof typeof icons;
  label: string;
}

const ModuleButtonReplica = ({
  className,
  icon,
  label,
  ...props
}: ModuleButtonReplicaProps) => {
  return (
    <div
      className={cn(
        'aspect-square flex flex-col gap-1 bg-gradient-to-b rounded-xl from-accent to-muted items-center justify-center w-[64px] md:w-[128px] border border-ring ',
        className
      )}
      {...props}
    >
      <LucideIcon name={icon} className="w-4 md:w-8 h-4 md:h-8" />
      <span className="font-medium text-3xs md:text-base">{label}</span>
    </div>
  );
};

export default ModuleButtonReplica;
