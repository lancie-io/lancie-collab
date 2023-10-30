import ModuleButton from '@/components/project/ModuleButton';
import Avatar from '@/components/shared/Avatar';
import Title from '@/components/shared/Title';
import { Button } from '@/components/ui/button';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  CircleDollarSign,
  Home,
  Image,
  MapPinned,
  ScrollText,
  Video,
} from 'lucide-react';
import Link from 'next/link';
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
    <div className="grow flex flex-col">
      <div className="border-b h-16 flex justify-between items-center px-4">
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
          <Button size="sm">Share</Button>
        </div>
      </div>
      <div className="grow flex">
        <div className="border-r w-[100px] p-3 space-y-3">
          <ModuleButton icon={<Image />} label="Moodboard" />
          <ModuleButton icon={<Video />} label="Ref. Videos" />
          <ModuleButton icon={<ScrollText />} label="Script" />
          <ModuleButton icon={<CircleDollarSign />} label="Financials" />
          <ModuleButton icon={<MapPinned />} label="Locations" />
        </div>
        <div className="grow p-6">Edit Area</div>
        <div className="w-[180px] border-l shrink-0 p-6">Comments</div>
      </div>
    </div>
  );
};

export default ProjectPage;
