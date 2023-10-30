import ProjectCreateButton from '@/components/projects/ProjectCreateButton';
import ProjectGrid from '@/components/projects/ProjectGrid';
import Title from '@/components/shared/Title';
import prisma from '@/lib/prisma';

const OverviewPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <Title>Projects</Title>
        <ProjectCreateButton />
      </div>
      <ProjectGrid />
    </div>
  );
};

export default OverviewPage;
