import Title from '@/components/shared/Title';
import prisma from '@/lib/prisma';

const OverviewPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <Title>Projects</Title>
    </div>
  );
};

export default OverviewPage;
