import { Room } from '@/app/app/(project)/project/[id]/Room';
import { BuilderElementInstance } from '@/components/project/BuilderElements';
import PreviewModuleBar from '@/components/project/elements/shared/PreviewModuleBar';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { Home, MessageSquare } from 'lucide-react';
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
    <Room roomId={project.id}>
      <div className="bg-subtle grow">
        <div className="relative border-b h-16 flex justify-between items-center px-4 shrink-0 w-full bg-background">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
            {project.name}
          </div>
          <Home />
          <MessageSquare />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-4 py-4 px-[500px]">
          {elements.map((element) => {
            // const BuilderElement = BuilderElements[element.type].previewComponent;
            return (
              <div
                key={element.id}
                className={cn(
                  'border bg-background rounded-lg overflow-hidden relative '
                )}
              >
                <PreviewModuleBar element={element} />
                {/* <BuilderElement elementInstance={element} /> */}
                <div className="aspect-[3/1]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </Room>
  );
};

export default PublicProjectPage;
