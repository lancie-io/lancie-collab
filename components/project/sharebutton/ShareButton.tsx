import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/projects/Modal';
import { Button } from '@/components/ui/button';
import GenerateLinkButton from './GenerateLinkButton';
import MemberTable from './MemberTable';
import PublishForm from './PublishForm';
import ShareForm from './ShareForm';

interface ShareButtonProps {
  projectId: string;
}

const ShareButton = ({ projectId }: ShareButtonProps) => {
  return (
    <Modal>
      <ModalTrigger>
        <Button variant="primary" size="sm">
          Share
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Share</ModalTitle>
        </ModalHeader>
        <PublishForm />
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
