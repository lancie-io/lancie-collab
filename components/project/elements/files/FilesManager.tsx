import { FileUploadTrigger } from '@/components/shared/upload/FileUpload';
import { useUpload } from '@/components/shared/upload/UploadProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import ElementBar from '../shared/ElementBar';
import EmptyState from '../shared/EmptyState';
import FileItem from './FileItem';
import { File, FilesElement } from './FilesBuilderElement';

interface FilesManagerProps {
  element: FilesElement;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  const { extraAttributes } = element;
  const { files } = extraAttributes;
  const [value, setValue] = useState();
  const { isUploading } = useUpload();
  return (
    <div className="min-h-[240px]">
      <ElementBar>
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

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="s">
              <Link className="w-3 h-3" />
              File URL
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex items-center space-x-2">
            <Input placeholder="Enter file URL..." />
            <Button>Add</Button>
          </PopoverContent>
        </Popover>
      </ElementBar>
      <div className="flex flex-wrap p-4 gap-4">
        {isUploading && (
          <div className="aspect-[5/4] rounded-lg border-2 w-[160px] flex items-center justify-center flex-col gap-2 opacity-50">
            <Loader2 className="animate-spin" />
            <p className="text-sm">Uploading...</p>
          </div>
        )}
        {files.map((file: File) => (
          <FileItem element={element} file={file} key={file.url} />
        ))}
      </div>
      {files.length < 1 && (
        <EmptyState
          title="Add Files"
          description="Add anything that is relevant to the production"
          icon="FileText"
        />
      )}
    </div>
  );
};

export default FilesManager;

interface NewFileItemProps extends React.HTMLAttributes<HTMLButtonElement> {}

const NewFileItem = (props: NewFileItemProps) => {
  const { file, isUploading } = useUpload();
  return (
    <button
      {...props}
      disabled={isUploading}
      className="shrink-0 rounded-lg aspect-[5/4] flex flex-col items-center justify-center gap-2 border-2 border-dashed w-[160px] text-muted-foreground hover:bg-muted"
    >
      {isUploading ? <Loader2 className="animate-spin" /> : <Upload />}
      <p className="text-sm">Upload new file</p>
    </button>
  );
};
