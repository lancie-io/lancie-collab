import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/projects/Modal';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';
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
        <ModalHeader className="flex-row justify-between space-y-0">
          <ModalTitle>Share</ModalTitle>
          <Button variant="link" size="s" className="h-6 mr-4">
            <Link className="w-4 h-4" />
            Copy Link
          </Button>
        </ModalHeader>
        {/* <PublishForm /> */}
        <div className="space-y-4">
          <div className="w-full flex flex-col items-stretch gap-2">
            <ShareForm projectId={projectId} />
            <p className="text-sm text-muted-foreground text-center">or</p>
            <GenerateLinkButton projectId={projectId} />
          </div>
          <MemberTable projectId={projectId} />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ShareButton;
