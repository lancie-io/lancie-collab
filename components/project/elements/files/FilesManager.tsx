import { Upload } from 'lucide-react';
import FileItem from './FileItem';
import { File, FilesElement } from './FilesBuilderElement';

interface FilesManagerProps {
  element: FilesElement;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  const { extraAttributes } = element;
  const { files } = extraAttributes;
  return (
    <div>
      <div className="flex flex-wrap p-4 gap-4">
        {files.map((file: File) => (
          <FileItem file={file} key={file.url} />
        ))}

        <NewFileItem />
      </div>
    </div>
  );
};

export default FilesManager;

const NewFileItem = () => {
  return (
    <div className="shrink-0 rounded-lg aspect-[3/2] flex flex-col items-center justify-center gap-2 border-2 border-dashed w-[160px] text-muted-foreground">
      <Upload />
      <p className="text-sm">Upload new file</p>
    </div>
  );
};
