import { useProjectId } from '@/components/providers/ProjectProvider';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { FileUploadTrigger } from '@/components/shared/upload/FileUpload';
import { useUpload } from '@/components/shared/upload/UploadProvider';
import { getProjectCover } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

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
      <div className="relative grid place-items-center overflow-hidden bg-muted hover:bg-accent h-full w-full rounded-md">
        {isUploading && <Loader2 className="animate-spin w-16 h-16" />}
        {url && <OptimizedImage fill src={url} />}
      </div>
    </FileUploadTrigger>
  );
};

export default SummaryCoverUpload;
