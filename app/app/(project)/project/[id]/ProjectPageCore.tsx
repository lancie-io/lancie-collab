import MobileToolbar from '@/components/builder/toolbar/MobileToolbar';
import BuilderArea from '@/components/project/BuilderArea';
import BuilderHeader from '@/components/project/BuilderHeader';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import ClientSideSetter from '@/components/project/ClientSideSetter';
import BuilderSidebarRight from '@/components/project/elements/BuilderSidebarRight';
import { cn } from '@/lib/utils';

const ProjectPageCore = ({
  projectId,
  isAuthorized,
}: {
  projectId: string;
  isAuthorized: boolean;
}) => {
  return (
    <div className="grow flex flex-col" style={{ height: '100dvh' }}>
      <ClientSideSetter projectId={projectId} />
      <BuilderHeader projectId={projectId} isAuthorized={isAuthorized} />
      <MobileToolbar projectId={projectId} isAuthorized={isAuthorized} />
      <div className="grow flex overflow-scroll no-scrollbar">
        <BuilderSidebar className={cn('hidden md:block')} />
        <BuilderArea />
        <BuilderSidebarRight
          isAuthorized={isAuthorized}
          className="hidden md:flex"
        />
      </div>
    </div>
  );
};

export default ProjectPageCore;
