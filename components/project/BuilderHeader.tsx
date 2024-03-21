import BuilderHeaderTitle from '../builder/BuilderHeaderTitle';
import HomeLink from '../builder/HomeLink';
import AvatarStack from './AvatarStack';
import CommentToggle from './CommentToggle';
import SwitchViewsTabs from './SwitchViewsTabs';
import ShareButton from './sharebutton/ShareButton';

interface BuilderHeaderProps {
  projectId: string;
  isAuthorized: boolean;
}
const BuilderHeader = ({ projectId, isAuthorized }: BuilderHeaderProps) => {
  return (
    <div className="border-b h-12 md:h-16 flex justify-between items-center px-3 shrink-0 bg-background z-40 relative">
      <HomeLink />
      <div className="mr-auto pl-3 md:pl-4">
        <BuilderHeaderTitle projectId={projectId} />
      </div>
      <div className="flex items-center gap-3">
        <CommentToggle />
        {isAuthorized && <SwitchViewsTabs />}

        <AvatarStack className="hidden md:flex" />
        <ShareButton
          className="hidden md:inline-flex"
          projectId={projectId}
          isAuthorized={isAuthorized}
        />
      </div>
    </div>
  );
};

export default BuilderHeader;
