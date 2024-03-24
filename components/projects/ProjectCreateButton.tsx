'use client';
import { PlusCircle } from 'lucide-react';
import { trackEvent } from '../providers/Analytics';
import { Button } from '../ui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './Modal';
import ProjectCreateForm from './ProjectCreateForm';

const ProjectCreateButton = () => {
  return (
    <Modal>
      <ModalTrigger>
        <Button
          variant="primary"
          onClick={() => trackEvent('CreateProjectButton Clicked')}
        >
          <PlusCircle className="w-4 h-4" />
          Create Project
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create Project</ModalTitle>
        </ModalHeader>
        <ProjectCreateForm />
      </ModalContent>
    </Modal>
  );
};

export default ProjectCreateButton;
