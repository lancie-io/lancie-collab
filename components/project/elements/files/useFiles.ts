import { useProjectId } from '@/components/providers/ProjectProvider';
import { useBroadcastEvent } from '@/liveblocks.config';
import { Prisma } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { addFile, deleteFile, getFiles, renameFile } from './actions';

export default function useFiles() {
  const broadcast = useBroadcastEvent();
  const queryClient = useQueryClient();
  const projectId = useProjectId();
  const { data, refetch } = useQuery({
    queryKey: ['files', projectId],
    queryFn: async () => await getFiles({ projectId }),
  });
  const addFileMutation = useMutation({
    mutationFn: async (file: Prisma.FileCreateInput) =>
      await addFile(file, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
      broadcast({
        type: 'refetch',
        data: {
          key: ['files', projectId],
        },
      });
    },
    onMutate: (file: Prisma.FileCreateInput) => {
      const optimisticFile = {
        id: nanoid(),
        url: file.url,
        name: file.name,
        type: file.type,
      };
      queryClient.setQueryData(['files', projectId], (old: any) => {
        return {
          files: [optimisticFile, ...old.files],
        };
      });
      return { optimisticFile };
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      await deleteFile(fileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
      broadcast({
        type: 'refetch',
        data: {
          key: ['files', projectId],
        },
      });
    },
  });

  const renameFileMutation = useMutation({
    mutationFn: async ({
      fileId,
      newName,
    }: {
      fileId: string;
      newName: string;
    }) => {
      const res = await renameFile(fileId, newName);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
      broadcast({
        type: 'refetch',
        data: {
          key: ['files', projectId],
        },
      });
    },
  });

  return {
    refetch,
    files: data?.files,
    status: addFileMutation.status,
    addFile: addFileMutation.mutateAsync,
    deleteFile: deleteFileMutation.mutateAsync,
    renameFile: renameFileMutation.mutateAsync,
  };
}
