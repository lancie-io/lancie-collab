'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import LucideIcon from '../shared/LucideIcon';

const SwitchViewsTabs = () => {
  return (
    <div className="inline-flex h-8 md:h-9 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground">
      <ViewTab value="edit" icon="Pen" />
      <ViewTab value="view" icon="Eye" />
    </div>
  );
};

export default SwitchViewsTabs;

interface ViewTabProps {
  value: string;
  icon: keyof typeof icons;
}

const ViewTab = ({ value, icon }: ViewTabProps) => {
  const isActive = value === 'edit';
  return (
    <button
      className={cn(
        'relative aspect-square h-full inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="view-indicator"
          className="w-full h-full absolute left-0 top-0 bg-background rounded-full"
        />
      )}
      <LucideIcon
        name={icon}
        className={cn('relative w-3 h-3', isActive && 'text-foreground')}
      />
    </button>
  );
};
