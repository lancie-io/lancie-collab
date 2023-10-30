import { Prisma } from '@prisma/client';
import Link from 'next/link';

interface GridItemProps {
  project: Prisma.ProjectGetPayload<{}>;
}

const GridItem = ({ project }: GridItemProps) => {
  return (
    <Link href={`/app/project/${project.id}`}>
      <div className="transition duration-150 aspect-video border-2 rounded-lg grid place-items-center hover:border-primary">
        {project.name}
      </div>
    </Link>
  );
};

export default GridItem;
