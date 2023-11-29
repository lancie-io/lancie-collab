'use client';
import { ArrowRightFromLine } from 'lucide-react';
import { useModal } from '../shared/modal';
import { Button } from '../ui/button';
import { useProject } from './ProjectProvider';
import PublishModal from './PublishModal';

const PublishButton = () => {
  const { show } = useModal();
  const { project, setProject } = useProject();
  return (
    <Button
      variant="primary"
      onClick={() =>
        show(<PublishModal project={project} setProject={setProject} />)
      }
      size="sm"
    >
      <ArrowRightFromLine className="w-4 h-4" />
      Publish
    </Button>
  );
};

export default PublishButton;
