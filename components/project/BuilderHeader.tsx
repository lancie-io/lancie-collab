import { Prisma } from '@prisma/client';
import { Home } from 'lucide-react';
import Link from 'next/link';
import Title from '../shared/Title';
import AvatarStack from './AvatarStack';
import PublishButton from './PublishButton';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';

interface BuilderHeaderProps {
  project: Prisma.ProjectGetPayload<{}>;
}
const BuilderHeader = ({ project }: BuilderHeaderProps) => {
  return (
    <div className="border-b h-16 flex justify-between items-center px-4 shrink-0">
      <Link
        href="/app"
        className="transition duration-150 border-r h-full grid place-items-center relative -left-4 px-4 group hover:bg-primary"
      >
        <Home className="group-hover:text-secondary" />
      </Link>

      <div className="mr-auto pl-4">
        <Title className="text-lg">{project.name}</Title>
      </div>
      <div className="flex items-center gap-3">
        <AvatarStack />
        <SaveButton id={project.id} />
        <ShareButton />
        <PublishButton />
      </div>
    </div>
  );
};

export default BuilderHeader;
