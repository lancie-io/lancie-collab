import AppSidebar from '@/components/layout/AppSidebar';
import ProjectCreateButton from '@/components/projects/ProjectCreateButton';
import ProjectGrid from '@/components/projects/ProjectGrid';
import Title from '@/components/shared/Title';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import prisma from '@/lib/prisma';
import { PanelLeft } from 'lucide-react';

const OverviewPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div className="space-y-8">
      <div className="flex items-center md:items-end justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <PanelLeft className="md:hidden mr-3" />
          </SheetTrigger>
          <SheetContent side="left" className="max-w-[240px]">
            <AppSidebar />
          </SheetContent>
        </Sheet>
        <Title className="mr-auto text-lg md:text-2xl">Projects</Title>
        <ProjectCreateButton />
      </div>
      <ProjectGrid />
    </div>
  );
};

export default OverviewPage;
