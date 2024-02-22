import UserLayout from '@/components/layout/UserLayout';
import ProjectCreateButton from '@/components/projects/ProjectCreateButton';
import ProjectGrid, {
  LoadingProjectGrid,
} from '@/components/projects/ProjectGrid';
import WelcomeModal from '@/components/welcomemodal/WelcomeModal';
import { Suspense } from 'react';

export const revalidate = 0;

const OverviewPage = () => {
  return (
    <UserLayout title="Projects" cta={<ProjectCreateButton />}>
      <WelcomeModal />
      <Suspense fallback={<LoadingProjectGrid />}>
        <ProjectGrid />
      </Suspense>
    </UserLayout>
  );
};

export default OverviewPage;
