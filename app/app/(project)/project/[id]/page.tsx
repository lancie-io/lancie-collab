import { CommentProvider } from '@/components/project/CommentToggle';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import DndProvider from '@/components/providers/DndProvider';
import ProjectProvider from '@/components/providers/ProjectProvider';
import { RoomProvider } from '@/components/providers/RoomProvider';
import ViewProvider from '@/components/providers/ViewProvider';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectPageCore from './ProjectPageCore';

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      members: true,
    },
  });
  const user = await getAuthUser();

  if (!project) {
    notFound();
  }

  const isMemberOfProject = project?.members.some(
    (member) => member.id === user?.id
  );

  return (
    <ViewProvider initialView={isMemberOfProject ? 'edit' : 'view'}>
      <RoomProvider roomId={params.id}>
        <DndProvider>
          <ProjectProvider initProjectId={params.id}>
            <CommentProvider>
              <ProjectPageCore projectId={params.id} />
            </CommentProvider>
            <DragOverlayWrapper />
          </ProjectProvider>
        </DndProvider>
      </RoomProvider>
    </ViewProvider>
  );
};

export default ProjectPage;
