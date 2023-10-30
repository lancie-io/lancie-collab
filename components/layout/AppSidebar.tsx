import { LayoutGrid } from 'lucide-react';
import AvatarDropdown from '../shared/AvatarDropdown';
import { Button } from '../ui/button';

const AppSidebar = () => {
  return (
    <div className="w-[240px] border-r p-3">
      <div className="mb-4">
        <AvatarDropdown />
      </div>
      <Button className="w-full justify-start">
        <LayoutGrid className="w-5 h-5" />
        Projects
      </Button>
    </div>
  );
};

export default AppSidebar;
