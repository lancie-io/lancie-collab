import { FileUploadTrigger } from '@/components/shared/upload/FileUpload';
import { useUpload } from '@/components/shared/upload/UploadProvider';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { MoodboardElement } from './MoodboardBuilderElement';

interface UploadButtonProps {
  element: MoodboardElement;
}

const UploadButton = ({ element }: UploadButtonProps) => {
  const { isUploading } = useUpload();
  return (
    <FileUploadTrigger>
      <Button size="s" variant="outline" disabled={isUploading}>
        {isUploading ? (
          <Loader2 className="animate-spin w-3 h-3" />
        ) : (
          <Upload className="w-3 h-3" />
        )}
        Upload
      </Button>
    </FileUploadTrigger>
  );
};

export default UploadButton;
