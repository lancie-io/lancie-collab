import { PanelLeft } from 'lucide-react';
import { Suspense } from 'react';
import FeedbackButton from '../FeedbackButton';
import AvatarDropdown, {
  LoadingAvatarDropdown,
} from '../shared/AvatarDropdown';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import WelcomeModal from '../welcomemodal/WelcomeModal';
import SidebarMenu from './SidebarMenu';

const AppSidebar = () => {
  return (
    <aside className="p-3 md:p-6 h-full flex flex-col">
      <div className="mb-auto">
        <Suspense fallback={<LoadingAvatarDropdown />}>
          <AvatarDropdown inApp={true} showName={true} />
        </Suspense>
        <SidebarMenu />
      </div>
      <div className="flex flex-col items-stretch gap-1.5">
        <WelcomeModal>
          <Button variant="ghost" size="sm">
            How it works
          </Button>
        </WelcomeModal>
        <FeedbackButton className="w-full" />
      </div>
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
