import { useProjectId } from '@/components/providers/ProjectProvider';
import { useUpload } from '@/components/shared/upload/UploadProvider';
import {
  DropzoneFile,
  MultiFileDropzoneUsage,
} from '@/components/upload/MultiFileDropzoneUsage';
import { useAuthUser } from '@/lib/auth';
import { useEdgeStore } from '@/lib/edgestore';
import { useBroadcastEvent, useEventListener } from '@/liveblocks.config';
import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileEmbedButton from './FileEmbedButton';
import FileItem from './FileItem';
import { FilesElement } from './FilesBuilderElement';
import { addFile, getFiles } from './actions';

interface FilesManagerProps {
  element: FilesElement;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  const projectId = useProjectId();
  const router = useRouter();
  const user = useAuthUser();
  const { extraAttributes } = element;
  const [value, setValue] = useState();
  const { isUploading } = useUpload();
  const { data, isLoading, refetch, isRefetching, isFetched, isFetching } =
    useQuery({
      queryKey: ['files', projectId],
      queryFn: async () => getFiles({ projectId: projectId }),
    });
  const files = data?.data;

  function onFileAdded(file: DropzoneFile) {
    addFile(file, projectId);
  }
  const { reset } = useEdgeStore();
  const broadcast = useBroadcastEvent();
  const onComplete = async () => {
    await refetch();
    // console.log('refetched');
    broadcast({
      type: 'refetch',
      data: {
        key: ['files', projectId],
      },
    });
  };

  useEventListener(({ event, user, connectionId }: any) => {
    //                       ^^^^ Will be Client A
    // Do something
    if (event.type === 'refetch') {
      refetch();
    }
  });

  return (
    <div className="min-h-[240px] flex flex-col overflow-hidden">
      <div className="border-b h-12 px-2 gap-2 flex items-center shrink-0">
        <FileEmbedButton />
      </div>
      <div className="flex flex-wrap gap-3 p-3">
        <MultiFileDropzoneUsage
          isRefetching={isRefetching}
          onFileAdded={onFileAdded}
          onComplete={onComplete}
        />
        <AnimatePresence>
          {files?.map((file: Prisma.FileGetPayload<{}>) => (
            <motion.div exit={{ scale: 0.5, opacity: 0 }} key={file.id}>
              <FileItem file={file} element={element} key={file.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilesManager;
