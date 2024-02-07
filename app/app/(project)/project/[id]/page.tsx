import MobileToolbar from '@/components/builder/toolbar/MobileToolbar';
import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderProvider from '@/components/project/BuilderProvider';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import { Conversation } from '@/components/project/comments/Conversation';
import DndProvider from '@/components/providers/DndProvider';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { RoomWrapper } from './Room';

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
    <RoomWrapper roomId={project.id}>
      <DndProvider>
        <BuilderProvider
          elementsFromServer={project.content}
          projectId={project.id}
        >
          <div className="grow flex flex-col" style={{ height: '100dvh' }}>
            <BuilderHeader project={project} />
            <MobileToolbar project={project} />
            <div className="grow flex overflow-scroll no-scrollbar">
              <BuilderSidebar className="hidden md:block" />
              <BuilderArea project={project} />
              <Conversation className="hidden md:block" />
            </div>
          </div>
          <DragOverlayWrapper />
        </BuilderProvider>
      </DndProvider>
    </RoomWrapper>
  );
};

export default ProjectPage;
