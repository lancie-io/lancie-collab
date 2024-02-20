import { useProjectId } from '@/components/providers/ProjectProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import Editor from './Editor';

const LiveEditor = ({
  id,
  placeholder,
  editable = true,
}: {
  id: string;
  placeholder?: string;
  editable?: boolean;
}) => {
  const projectId = useProjectId();
  if (!projectId) {
    return <LoadingEditor />;
  }
  return (
    <RoomProvider id={`${projectId}-editor-${id}`} initialPresence={{}}>
      <ClientSideSuspense fallback={<LoadingEditor />}>
        {() => <Editor editable={editable} placeholder={placeholder} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveEditor;

const LoadingEditor = () => {
  return (
    <div className="w-full space-y-2 p-5">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
};
