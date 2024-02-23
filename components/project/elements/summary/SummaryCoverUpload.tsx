import { useUpload } from '@/components/fileupload/Upload';
import UploadIndicator from '@/components/fileupload/UploadIndicator';
import { UploadTrigger } from '@/components/fileupload/UploadTrigger';
import { useProjectId } from '@/components/providers/ProjectProvider';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import { getProjectCover, updateProject } from '@/lib/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

const SummaryCoverUpload = () => {
  const projectId = useProjectId();
  const { isUploading, fileStates } = useUpload();
  const { data: url, status } = useQuery({
    queryKey: ['cover', projectId],
    queryFn: async () => {
      return await getProjectCover(projectId);
    },
  });

  const queryClient = useQueryClient();

  async function removeCoverImage() {
    if (!projectId) return;
    const res = await updateProject(projectId, { cover: null });
    if (res.success) {
      toast.success('Project cover removed.');
    } else {
      toast.error('Project cover update failed.');
    }
    queryClient.invalidateQueries({ queryKey: ['cover'] });
  }
  return (
    <div className="rounded-md overflow-hidden aspect-video relative border">
      <UploadTrigger>
        {url && (
          <div className="w-full h-full absolute left-0 top-0">
            <OptimizedImage
              fill
              src={url}
              style={{
                opacity: isUploading ? 0.5 : 1,
              }}
            />
            <Button
              variant="ghost"
              size="iconSmall"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeCoverImage();
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        )}
        {isUploading && <UploadIndicator fileStates={fileStates} />}
      </UploadTrigger>
    </div>

    // <div className="cursor-pointer relative grid place-items-center overflow-hidden bg-muted hover:bg-accent h-full w-full rounded-md border-2 border-dashed min-aspect">
    //   {url && (
    //     <OptimizedImage
    //       fill
    //       src={url}
    //       style={{
    //         opacity: isUploading ? 0.5 : 1,
    //       }}
    //     />
    //   )}
    //   {isUploading && <Loader2 className="animate-spin w-16 h-16 absolute" />}
    //   {!url && !isUploading && (
    //     <div className="absolute text-center space-y-2 flex flex-col items-center">
    //       <Image className="w-8 h-8" />
    //       <p>Click to upload</p>
    //     </div>
    //   )}
    // </div>
  );
};

export default SummaryCoverUpload;
