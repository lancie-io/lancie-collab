import UserLayout from '@/components/layout/UserLayout';
import ProjectCreateButton from '@/components/projects/ProjectCreateButton';
import ProjectGrid, {
  LoadingProjectGrid,
} from '@/components/projects/ProjectGrid';
import { Suspense } from 'react';

const OverviewPage = () => {
  return (
    <UserLayout title="Projects" cta={<ProjectCreateButton />}>
      <Suspense fallback={<LoadingProjectGrid />}>
        <ProjectGrid />
      </Suspense>
    </UserLayout>
  );
};

export default OverviewPage;
