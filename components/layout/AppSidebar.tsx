import { getAuthUser } from '@/lib/auth';
import { PanelLeft } from 'lucide-react';
import AvatarDropdown from '../shared/AvatarDropdown';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import SidebarLink from './SidebarLink';

const AppSidebar = async () => {
  const user = await getAuthUser();
  return (
    <aside className="p-0 md:p-6">
      <div className="mb-4">
        <AvatarDropdown inApp={true} showName={true} />
      </div>
      {/* <Button className="w-full justify-start">
        <LayoutGrid className="w-5 h-5" />
        Projects
      </Button> */}
      <SidebarLink label="Projects" segment="/" href={`/app/${user?.id}`} />
    </aside>
  );
};

export default AppSidebar;

export const MobileAppSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <PanelLeft className="md:hidden mr-3" />
      </SheetTrigger>
      <SheetContent side="left" className="max-w-[240px]">
        <AppSidebar />
      </SheetContent>
    </Sheet>
  );
};
