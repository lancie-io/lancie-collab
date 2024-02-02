import { LayoutGrid } from 'lucide-react';
import AvatarDropdown from '../shared/AvatarDropdown';
import { Button } from '../ui/button';

const AppSidebar = () => {
  return (
    <aside className="p-0 md:p-6">
      <div className="mb-4">
        <AvatarDropdown inApp={true} showName={true} />
      </div>
      <Button className="w-full justify-start">
        <LayoutGrid className="w-5 h-5" />
        Projects
      </Button>
    </aside>
  );
};

export default AppSidebar;
