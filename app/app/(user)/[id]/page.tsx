import UserLayout from '@/components/layout/UserLayout';
import ProjectCreateButton from '@/components/projects/ProjectCreateButton';
import ProjectGrid from '@/components/projects/ProjectGrid';

const OverviewPage = ({ params }: { params: { id: string } }) => {
  return (
    <UserLayout title="Projects" cta={<ProjectCreateButton />}>
      <ProjectGrid />
    </UserLayout>
  );
};

export default OverviewPage;
