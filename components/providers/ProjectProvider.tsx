'use client';
import { createContext, useContext, useState } from 'react';

type ProjectContextType = {
  projectId?: string;
};

const ProjectContext = createContext<ProjectContextType>({
  projectId: undefined,
});

const ProjectProvider = ({
  children,
  initProjectId,
}: {
  children: React.ReactNode;
  initProjectId: string;
}) => {
  const [projectId, _] = useState<string>(initProjectId);

  const value = {
    projectId: projectId,
  };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProjectId = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectId must be used within a ProjectProvider');
  }
  return context.projectId;
};
