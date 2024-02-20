import MobileToolbar from '@/components/builder/toolbar/MobileToolbar';
import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import { Conversation } from '@/components/project/comments/Conversation';
import DndProvider from '@/components/providers/DndProvider';
import ProjectProvider from '@/components/providers/ProjectProvider';
import { RoomProvider } from '@/components/providers/RoomProvider';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';

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
    <RoomProvider roomId={params.id}>
      <DndProvider>
        <ProjectProvider initProjectId={params.id}>
          <div className="grow flex flex-col" style={{ height: '100dvh' }}>
            <BuilderHeader projectId={params.id} />
            <MobileToolbar projectId={params.id} />
            <div className="grow flex overflow-scroll no-scrollbar">
              <BuilderSidebar className={cn('hidden md:block')} />
              <BuilderArea />
              <Conversation className="hidden md:block" />
            </div>
          </div>
          <DragOverlayWrapper />
        </ProjectProvider>
      </DndProvider>
    </RoomProvider>
  );
};

export default ProjectPage;
