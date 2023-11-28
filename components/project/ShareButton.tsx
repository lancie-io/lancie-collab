'use client';
import { Users } from 'lucide-react';
import { useModal } from '../shared/modal';
import { Button } from '../ui/button';
import { useProject } from './ProjectProvider';
import ShareModal from './ShareModal';

const ShareButton = () => {
  const { show } = useModal();
  const { project } = useProject();
  return (
    <Button size="sm" onClick={() => show(<ShareModal project={project} />)}>
      <Users className="w-4 h-4" />
      Share
    </Button>
  );
};

export default ShareButton;
