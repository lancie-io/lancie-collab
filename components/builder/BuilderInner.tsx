import { cn } from '@/lib/utils';
import BuilderArea from '../project/BuilderArea';
import BuilderHeader from '../project/BuilderHeader';
import BuilderProvider from '../project/BuilderProvider';
import BuilderSidebar from '../project/BuilderSidebar';
import DragOverlayWrapper from '../project/DragOverlayWrapper';
import { Conversation } from '../project/comments/Conversation';
import DndProvider from '../providers/DndProvider';
import MobileToolbar from './toolbar/MobileToolbar';

const BuilderInner = ({
  projectId,
  content,
}: {
  projectId: string;
  content: any;
}) => {
  return (
    <DndProvider>
      <BuilderProvider elementsFromServer={content} projectId={projectId}>
        <div className="grow flex flex-col" style={{ height: '100dvh' }}>
          <BuilderHeader projectId={projectId} />
          <MobileToolbar projectId={projectId} />
          <div className="grow flex overflow-scroll no-scrollbar">
            <BuilderSidebar className={cn('hidden md:block')} />
            <BuilderArea />
            <Conversation className="hidden md:block" />
          </div>
        </div>
        <DragOverlayWrapper />
      </BuilderProvider>
    </DndProvider>
  );
};

export default BuilderInner;
