import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Icons } from '../shared/Icons';
import GridItem from './GridItem';

const ProjectGrid = async () => {
  const user = await getAuthUser();
  const projects = await prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div>
      {projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <GridItem key={project.id} project={project} />
          ))}
        </div>
      )}
      {projects.length < 1 && (
        <div className="flex flex-col items-center py-8 px-4">
          <Icons.camStars className="w-6 h-6 fill-primary" />
          <p className="font-semibold text-lg mt-1">No projects</p>
          <p className="text-muted-foreground text-sm">
            You have not created any projects yet. Create one.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
