import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/projects/Modal';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import GenerateLinkButton from './GenerateLinkButton';
import MemberTable from './MemberTable';
import ShareForm from './ShareForm';

interface ShareButtonProps extends ButtonProps {
  projectId: string;
}

const ShareButton = ({ projectId, className, ...props }: ShareButtonProps) => {
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
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Share</ModalTitle>
        </ModalHeader>
        {/* <PublishForm /> */}
        <div className="w-full flex flex-col items-stretch gap-2">
          <ShareForm projectId={projectId} />
          <p className="text-sm text-muted-foreground text-center">or</p>
          <GenerateLinkButton projectId={projectId} />
        </div>
        <MemberTable projectId={projectId} />
      </ModalContent>
    </Modal>
  );
};

export default ShareButton;
