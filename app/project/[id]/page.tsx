import AccessButtons from '@/components/project/AccessButtons';
import AvatarStack from '@/components/project/AvatarStack';
import { BuilderElementInstance } from '@/components/project/BuilderElements';
import { Conversation } from '@/components/project/comments/Conversation';
import { RoomProvider } from '@/components/providers/RoomProvider';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { Home, Link, MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';

const PublicProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    notFound();
  }
  const elements: BuilderElementInstance[] = JSON.parse(
    project.content as string
  );

  return (
    <RoomProvider roomId={`${project.id}-public`}>
      <div
        className="bg-subtle grow flex flex-col"
        style={{ height: '100dvh' }}
      >
        <div className="relative border-b h-16 flex justify-between items-center px-4 shrink-0 w-full bg-background">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
            {project.name}
          </div>
          <Home />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Link className="w-4 h-4" />
            </Button>
            <AccessButtons projectId={project.id} />
            <AvatarStack />
            <MessageSquare />
          </div>
        </div>
        <div className="w-full grow flex overflow-hidden">
          {/* <Modules elements={elements} /> */}
          <Conversation />
        </div>
      </div>
    </RoomProvider>
  );
};

export default PublicProjectPage;
