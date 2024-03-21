import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/projects/Modal';
import { Button, ButtonProps } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import MemberTable from './MemberTable';
import PublishArea from './PublishArea';
import ShareForm from './ShareForm';

interface ShareButtonProps extends ButtonProps {
  projectId: string;
  isAuthorized: boolean;
}

const ShareButton = ({
  projectId,
  className,
  isAuthorized,
  ...props
}: ShareButtonProps) => {
  return (
    <Modal>
      <ModalTrigger>
        <Button
          variant="primary"
          size="sm"
          className={cn(className)}
          {...props}
        >
          Share
        </Button>
      </ModalTrigger>
      <ModalContent className="md:max-w-[400px]">
        <ModalHeader>
          <ModalTitle>Share</ModalTitle>
        </ModalHeader>
        <div className="space-y-4">
          <div className="w-full flex flex-col items-stretch gap-2">
            <Tabs defaultValue="publish">
              <TabsList>
                <TabsTrigger value="publish">Publish</TabsTrigger>
                {isAuthorized && (
                  <TabsTrigger value="invite">Invite</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="publish">
                <PublishArea />
              </TabsContent>
              <TabsContent className="space-y-6" value="invite">
                <ShareForm projectId={projectId} />
                <MemberTable projectId={projectId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ShareButton;
