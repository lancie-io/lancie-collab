import { Prisma } from '@prisma/client';
import Link from 'next/link';
import Title from '../shared/Title';

interface GridItemProps {
  project: Prisma.ProjectGetPayload<{}>;
}

const GridItem = ({ project }: GridItemProps) => {
  return (
    <Link href={`/app/project/${project.id}`}>
      <div className="border-2 transition duration-150 aspect-video rounded-lg grid place-items-center hover:border-ring bg-muted hover:bg-accent">
        <Title as="h2">{project.name}</Title>
      </div>
    </Link>
  );
};

export default GridItem;
