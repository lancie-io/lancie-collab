import { useProjectId } from '@/components/providers/ProjectProvider';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { FileUploadTrigger } from '@/components/shared/upload/FileUpload';
import { useUpload } from '@/components/shared/upload/UploadProvider';
import { getProjectCover } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { Image, Loader2 } from 'lucide-react';

const SummaryCoverUpload = () => {
  const projectId = useProjectId();
  const { isUploading } = useUpload();
  const { data: url, status } = useQuery({
    queryKey: ['cover', projectId],
    queryFn: async () => {
      return await getProjectCover(projectId);
    },
  });
  return (
    <FileUploadTrigger>
      <div className="cursor-pointer relative grid place-items-center overflow-hidden bg-muted hover:bg-accent h-full w-full rounded-md border-2 border-dashed min-aspect">
        {url && (
          <OptimizedImage
            fill
            src={url}
            style={{
              opacity: isUploading ? 0.5 : 1,
            }}
          />
        )}
        {isUploading && <Loader2 className="animate-spin w-16 h-16 absolute" />}
        {!url && !isUploading && (
          <div className="absolute text-center space-y-2 flex flex-col items-center">
            <Image className="w-8 h-8" />
            <p>Click to upload</p>
          </div>
        )}
      </div>
    </FileUploadTrigger>
  );
};

export default SummaryCoverUpload;
