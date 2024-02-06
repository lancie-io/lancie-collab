import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import ProjectProvider from '@/components/project/ProjectProvider';
import { Conversation } from '@/components/project/comments/Conversation';
import DndProvider from '@/components/providers/DndProvider';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Room } from './Room';

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const user = await getAuthUser();
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      members: true,
    },
  });

  if (!project) {
    notFound();
  }

  const isMemberOfProject = project?.members.some(
    (member) => member.id === user?.id
  );

  if (!isMemberOfProject) {
    redirect('/app/unauthorized');
  }

  return (
    <Room roomId={project.id}>
      <DndProvider>
        <ProjectProvider
          initialProject={{
            id: project.id,
            name: project.name,
            published: project.published,
            userId: project.userId,
          }}
        >
          <div className="grow flex flex-col" style={{ height: '100dvh' }}>
            <BuilderHeader project={project} />
            <div className="grow flex overflow-scroll no-scrollbar">
              <BuilderSidebar />
              <BuilderArea project={project} />
              <Conversation />
            </div>
          </div>
        </ProjectProvider>
        <DragOverlayWrapper />
      </DndProvider>
    </Room>
  );
};

export default ProjectPage;
