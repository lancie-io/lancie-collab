import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SelectionTag = ({
  name,
  color,
  className,
}: {
  name: string;
  color: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        'rounded-t-md px-1.5 py-0.5 text-xs font-medium',
        className
      )}
      style={{ backgroundColor: color }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{
        ease: 'easeInOut',
        duration: 0.2,
      }}
    >
      {name.split(' ')[0]}
    </motion.div>
  );
};

export default SelectionTag;
