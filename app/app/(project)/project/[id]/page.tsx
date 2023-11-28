import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import ProjectProvider from '@/components/project/ProjectProvider';
import CommentsSidebar, {
  CommentsProvider,
} from '@/components/project/comments/CommentsSidebar';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

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

  const user = await getAuthUser();
  if (!project) {
    notFound();
  }
  return (
    <ProjectProvider
      initialProject={{
        id: project.id,
        name: project.name,
        published: project.published,
        userId: project.userId,
      }}
    >
      <CommentsProvider initialComments={project.comments}>
        <div className="grow flex flex-col " style={{ height: '100dvh' }}>
          <BuilderHeader project={project} />
          <div className="grow flex overflow-scroll">
            <BuilderSidebar />
            <BuilderArea project={project} />
            <CommentsSidebar projectId={project.id} />
          </div>
        </div>
      </CommentsProvider>
    </ProjectProvider>
  );
};

export default ProjectPage;
