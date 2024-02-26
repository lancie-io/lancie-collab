import { useView } from '@/components/providers/ViewProvider';

interface ElementBarProps {
  children: React.ReactNode;
}

const ElementBar = ({ children }: ElementBarProps) => {
  const { isView } = useView();
  if (isView) {
    return null;
  }
  return (
    <div className="flex items-center border-b h-12 gap-2 px-2 shrink-0">
      {children}
    </div>
  );
};

export default ElementBar;
