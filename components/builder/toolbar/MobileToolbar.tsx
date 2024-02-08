import AvatarStack from '@/components/project/AvatarStack';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import { Conversation } from '@/components/project/comments/Conversation';
import ShareButton from '@/components/project/sharebutton/ShareButton';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LayoutGrid, MessagesSquare } from 'lucide-react';

interface MobileToolbarProps {
  projectId: string;
}

const MobileToolbar = ({ projectId }: MobileToolbarProps) => {
  return (
    <div className="h-12 w-full md:hidden border-b shrink-0">
      <Container className="h-full flex items-center gap-1.5">
        <Sheet>
          <SheetTrigger>
            <Button size="iconSmall">
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-0">
            <SheetHeader>
              <SheetTitle className="text-left pl-3">Modules</SheetTitle>
            </SheetHeader>
            <BuilderSidebar className="max-h-[100dvh] overflow-scroll" />
          </SheetContent>
        </Sheet>
        <Drawer>
          <DrawerTrigger>
            <Button size="iconSmall">
              <MessagesSquare className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="">Comments</DrawerTitle>
            </DrawerHeader>
            <Conversation className="max-h-[400px] px-0" />
          </DrawerContent>
        </Drawer>

        <AvatarStack className="ml-auto" />
        <ShareButton projectId={projectId} size="s" />
      </Container>
    </div>
  );
};

export default MobileToolbar;
