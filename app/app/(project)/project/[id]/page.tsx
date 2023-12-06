import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import ProjectProvider from '@/components/project/ProjectProvider';
import { CommentsProvider } from '@/components/project/comments/CommentsSidebar';
import { Conversation } from '@/components/project/comments/Conversation';
import DndProvider from '@/components/providers/DndProvider';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Room } from './Room';

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    notFound();
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
          <CommentsProvider initialComments={project.comments}>
            <div className="grow flex flex-col" style={{ height: '100dvh' }}>
              <BuilderHeader project={project} />
              <div className="grow flex overflow-scroll no-scrollbar">
                <BuilderSidebar />
                <BuilderArea project={project} />
                <Conversation />
              </div>
            </div>
          </CommentsProvider>
        </ProjectProvider>
        <DragOverlayWrapper />
      </DndProvider>
    </Room>
  );
};

export default ProjectPage;
