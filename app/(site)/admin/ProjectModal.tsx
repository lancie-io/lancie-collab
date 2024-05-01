import BuilderArea from '@/components/project/BuilderArea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import ProjectPageCore from '@/app/app/(project)/project/[id]/ProjectPageCore';
import { CommentProvider } from '@/components/project/CommentToggle';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import DndProvider from '@/components/providers/DndProvider';
import ProjectProvider from '@/components/providers/ProjectProvider';
import { RoomProvider } from '@/components/providers/RoomProvider';
import ViewProvider from '@/components/providers/ViewProvider';

export default function ProjectModalButton({
  projectId,
}: {
  projectId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View project</Button>
      </DialogTrigger>
      <DialogContent>
        <BuilderArea />
        <ViewProvider initialView={'view'}>
          <RoomProvider roomId={projectId}>
            <DndProvider>
              <ProjectProvider initProjectId={projectId}>
                <CommentProvider>
                  <ProjectPageCore projectId={projectId} isAuthorized={true} />
                </CommentProvider>
                <DragOverlayWrapper />
              </ProjectProvider>
            </DndProvider>
          </RoomProvider>
        </ViewProvider>
      </DialogContent>
    </Dialog>
  );
}
