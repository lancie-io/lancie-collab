import { Prisma } from '@prisma/client';
import { Home } from 'lucide-react';
import Link from 'next/link';
import FeedbackButton from '../FeedbackButton';
import Title from '../shared/Title';
import AvatarStack from './AvatarStack';
import ShareButton from './sharebutton/ShareButton';

interface BuilderHeaderProps {
  project: Prisma.ProjectGetPayload<{}>;
}
const BuilderHeader = ({ project }: BuilderHeaderProps) => {
  return (
    <div className="border-b h-16 flex justify-between items-center px-4 shrink-0 bg-background z-40">
      <Link
        href="/app"
        className="transition duration-150 border-r h-full grid place-items-center relative -left-4 px-4 group hover:bg-accent"
      >
        <Home />
      </Link>

      <div className="mr-auto pl-4">
        <Title className="text-lg">{project.name}</Title>
        {/* <EditableLabel label={project.name} /> */}
      </div>
      <div className="flex items-center gap-3">
        <FeedbackButton />
        <AvatarStack />
        <ShareButton projectId={project.id} />
      </div>
    </div>
  );
};

export default BuilderHeader;
