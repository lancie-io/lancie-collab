import { getAuthUser } from '@/lib/auth';
import { Prisma } from '@prisma/client';
import { Home } from 'lucide-react';
import Link from 'next/link';
import Avatar from '../shared/Avatar';
import Title from '../shared/Title';
import { Button } from '../ui/button';
import SaveButton from './SaveButton';

interface BuilderHeaderProps {
  project: Prisma.ProjectGetPayload<{}>;
}
const BuilderHeader = async ({ project }: BuilderHeaderProps) => {
  const user = await getAuthUser();
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
      <div className="flex items-center gap-6">
        <Avatar className="h-8 w-8" data={user} />
        <SaveButton id={project.id} />
        <Button size="sm">Share</Button>
      </div>
    </div>
  );
};

export default BuilderHeader;
