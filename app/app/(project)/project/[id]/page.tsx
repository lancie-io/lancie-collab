import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  const user = await getAuthUser();
  if (!project) {
    notFound();
  }
  return (
    <div className="grow flex flex-col " style={{ height: '100dvh' }}>
      <BuilderHeader project={project} />
      <div className="grow flex overflow-scroll">
        <BuilderSidebar />
        <BuilderArea project={project} />
        <div className="w-[180px] border-l shrink-0 p-6">Comments</div>
      </div>
    </div>
  );
};

export default ProjectPage;
