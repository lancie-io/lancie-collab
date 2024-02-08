import FeedbackButton from '../FeedbackButton';
import BuilderHeaderTitle from '../builder/BuilderHeaderTitle';
import HomeLink from '../builder/HomeLink';
import LucideIcon from '../shared/LucideIcon';
import AvatarStack from './AvatarStack';
import SaveButton from './SaveButton';
import ShareButton from './sharebutton/ShareButton';

interface BuilderHeaderProps {
  projectId: string;
}
const BuilderHeader = ({ projectId }: BuilderHeaderProps) => {
  return (
    <div className="border-b h-12 md:h-16 flex justify-between items-center px-3 shrink-0 bg-background z-40">
      <HomeLink />
      <div className="mr-auto pl-3 md:pl-4">
        <BuilderHeaderTitle projectId={projectId} />
      </div>
      <div className="flex items-center gap-3">
        <SaveButton projectId={projectId} />
        <FeedbackButton className="hidden md:inline-flex" />
        <AvatarStack className="hidden md:flex" />
        <div className="md:hidden">
          <FeedbackButton size="iconSmall">
            <LucideIcon name="MessageCircleHeart" className="w-4 h-4" />
          </FeedbackButton>
        </div>
        <ShareButton className="hidden md:inline-flex" projectId={projectId} />
      </div>
    </div>
  );
};

export default BuilderHeader;
