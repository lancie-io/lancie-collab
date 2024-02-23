import { useUpload } from '@/components/fileupload/Upload';
import { UploadTrigger } from '@/components/fileupload/UploadTrigger';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { MoodboardElement } from './MoodboardBuilderElement';

interface UploadButtonProps {
  element: MoodboardElement;
}

const UploadButton = ({ element }: UploadButtonProps) => {
  const { isUploading } = useUpload();
  return (
    <UploadTrigger>
      <Button size="s" variant="outline" disabled={isUploading}>
        {isUploading ? (
          <Loader2 className="animate-spin w-3 h-3" />
        ) : (
          <Upload className="w-3 h-3" />
        )}
        Upload
      </Button>
    </UploadTrigger>
  );
};

export default UploadButton;
