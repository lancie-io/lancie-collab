import AvatarStack from '@/components/project/AvatarStack';
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
import { MessagesSquare } from 'lucide-react';
import MobileModulesButton from './MobileModulesButton';

interface MobileToolbarProps {
  projectId: string;
}

const MobileToolbar = ({ projectId }: MobileToolbarProps) => {
  return (
    <div className="h-12 w-full md:hidden border-b shrink-0">
      <Container className="h-full flex items-center gap-1.5">
        <MobileModulesButton />
        <Drawer>
          <DrawerTrigger>
            <Button size="iconSmall" variant="outline">
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
