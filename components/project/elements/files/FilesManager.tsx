import { FileText, Upload } from 'lucide-react';
import { FilesCustomInstance } from './FilesBuilderElement';

interface FilesManagerProps {
  element: FilesCustomInstance;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  return (
    <div>
      <div className="flex flex-wrap p-4 gap-4">
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <NewFileItem />
      </div>
    </div>
  );
};

export default FilesManager;

const FileItem = () => {
  return (
    <div className="shrink-0 rounded-lg aspect-[3/2] flex flex-col items-center justify-center gap-2 border-2 bg-subtle w-[160px] text-muted-foreground">
      <FileText />
      <p className="text-sm">lookbook.pdf</p>
    </div>
  );
};

const NewFileItem = () => {
  return (
    <div className="shrink-0 rounded-lg aspect-[3/2] flex flex-col items-center justify-center gap-2 border-2 border-dashed w-[160px] text-muted-foreground">
      <Upload />
      <p className="text-sm">Upload new file</p>
    </div>
  );
};
