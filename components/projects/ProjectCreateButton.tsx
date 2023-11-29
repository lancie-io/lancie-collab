'use client';
import { PlusCircle } from 'lucide-react';
import { useModal } from '../shared/modal';
import { Button } from '../ui/button';
import ProjectModalForm from './ProjectModalForm';

const ProjectCreateButton = () => {
  const { show } = useModal();
  return (
    <Button variant="primary" onClick={() => show(<ProjectModalForm />)}>
      <PlusCircle className="w-4 h-4" />
      Create Project
    </Button>
  );
};

export default ProjectCreateButton;
