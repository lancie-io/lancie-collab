import { Prisma } from '@prisma/client';
import { Home } from 'lucide-react';
import Link from 'next/link';
import FeedbackButton from '../FeedbackButton';
import LucideIcon from '../shared/LucideIcon';
import Title from '../shared/Title';
import AvatarStack from './AvatarStack';
import ShareButton from './sharebutton/ShareButton';

interface BuilderHeaderProps {
  project: Prisma.ProjectGetPayload<{}>;
}
const BuilderHeader = ({ project }: BuilderHeaderProps) => {
  return (
    <div className="border-b h-12 md:h-16 flex justify-between items-center px-3 shrink-0 bg-background z-40">
      <Link
        href="/app"
        className="transition duration-150 border-r h-full grid place-items-center relative -left-3 md:-left-4 px-3 md:px-4 group hover:bg-accent -mr-3 md:-mr-4"
      >
        <Home className="w-5 h-5" />
      </Link>

      <div className="mr-auto pl-3 md:pl-4">
        <Title className="text-base md:text-lg font-semibold">
          {project.name}
        </Title>
        {/* <EditableLabel label={project.name} /> */}
      </div>
      <div className="flex items-center gap-3">
        <FeedbackButton className="hidden md:inline-flex" />
        <AvatarStack className="hidden md:flex" />
        <div className="md:hidden">
          <FeedbackButton size="iconSmall">
            <LucideIcon name="MessageCircleHeart" className="w-4 h-4" />
          </FeedbackButton>
        </div>
        <ShareButton className="hidden md:inline-flex" projectId={project.id} />
      </div>
    </div>
  );
};

export default BuilderHeader;
