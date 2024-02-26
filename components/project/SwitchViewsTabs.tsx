'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import { View, useView } from '../providers/ViewProvider';
import LucideIcon from '../shared/LucideIcon';

const SwitchViewsTabs = () => {
  // const searchParams = useSearchParams();
  // const activeView = searchParams.get('mode') as View;
  const { view: activeView } = useView();
  return (
    <div className="inline-flex h-8 md:h-9 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground">
      <ViewTab isActive={activeView !== 'view'} value="edit" icon="Pen" />
      <ViewTab isActive={activeView === 'view'} value="view" icon="Eye" />
    </div>
  );
};

export default SwitchViewsTabs;

interface ViewTabProps {
  value: View;
  icon: keyof typeof icons;
  isActive: boolean;
}

const ViewTab = ({ value, icon, isActive }: ViewTabProps) => {
  const { view, setView } = useView();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // const router = useRouter();

  const handleToggle = () => {
    // router.push(pathname + '?' + createQueryString('mode', value));
    setView(value);
  };

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  return (
    <button
      className={cn(
        'relative aspect-square h-full inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none'
      )}
      onClick={handleToggle}
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
