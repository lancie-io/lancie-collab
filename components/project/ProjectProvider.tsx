'use client';
import { Prisma } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';

export type TProject = Pick<
  Prisma.ProjectGetPayload<{}>,
  'id' | 'published' | 'name' | 'userId'
>;

type TProjectContext = {
  project: TProject;
  setProject: (project: TProject) => void;
};

const ProjectContext = createContext<TProjectContext | undefined>(undefined);

interface ProjectProviderProps {
  children: React.ReactNode;
  initialProject: TProject;
}

const ProjectProvider = ({
  children,
  initialProject,
}: ProjectProviderProps) => {
  const [project, setProject] = useState(initialProject);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch additional data or perform any other initialization here
    setLoading(false);
  }, []);

  if (loading) {
    // You might want to return a loading state or skeleton component here
    return <div>Loading project...</div>;
  }
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
