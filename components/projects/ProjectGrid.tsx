import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { Icons } from '../shared/Icons';
import { Skeleton } from '../ui/skeleton';
import GridItem from './GridItem';

export type GridProjectT = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    name: true;
    cover: true;
    createdAt: true;
    updatedAt: true;
    user: true;
  };
}>;

const ProjectGrid = async () => {
  const user = await getAuthUser();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      memberProjects: {
        select: {
          id: true,
          name: true,
          cover: true,
          createdAt: true,
          updatedAt: true,
          user: true,
        },
      },
    },
  });
  const projects = dbUser!.memberProjects;
  return (
    <div>
      {projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          {projects.map((project) => (
            <GridItem key={project.id} project={project} />
          ))}
        </div>
      )}
      {projects.length < 1 && (
        <div className="flex flex-col items-center py-16 px-4 w-full border rounded-lg">
          <Icons.camStars className="w-10 h-10 fill-foreground text-center" />
          <p className="font-semibold text-lg mt-2">No projects</p>
          <p className="text-muted-foreground text-sm text-center mt-1">
            You have not created any projects yet. Create one.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;

export const LoadingProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
      {/* //render 6 skeleton items */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-video w-full" />
          <div className="mt-1.5 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
};
