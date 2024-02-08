import { PanelLeft } from 'lucide-react';
import { Suspense } from 'react';
import AvatarDropdown, {
  LoadingAvatarDropdown,
} from '../shared/AvatarDropdown';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import SidebarMenu from './SidebarMenu';

const AppSidebar = () => {
  return (
    <aside className="p-3 md:p-6">
      <div className="mb-4">
        <Suspense fallback={<LoadingAvatarDropdown />}>
          <AvatarDropdown inApp={true} showName={true} />
        </Suspense>
      </div>
      <SidebarMenu />
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
