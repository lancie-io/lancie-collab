'use client';
import { useView } from '@/components/providers/ViewProvider';
import { cn } from '@/lib/utils';
import { useComment } from '../CommentToggle';
import { Conversation } from '../comments/Conversation';

interface BuilderSidebarRightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isAuthorized?: boolean;
}

const BuilderSidebarRight = ({
  className,
  isAuthorized,
}: BuilderSidebarRightProps) => {
  const { isView } = useView();
  const { isOpen } = useComment();
  if (isView && !isOpen) {
    return null;
  }
  return (
    <div className={cn('h-full flex', className)}>
      <Conversation isAuthorized={isAuthorized} />
    </div>
  );
};

export default BuilderSidebarRight;
