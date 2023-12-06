import { FileUploadTrigger } from '@/components/shared/upload/FileUpload';
import UploadProvider, {
  UploadedFile,
  useUpload,
} from '@/components/shared/upload/UploadProvider';
import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import useBuilder from '../../hooks/useBuilder';
import FileItem from './FileItem';
import { File, FilesElement } from './FilesBuilderElement';

interface FilesManagerProps {
  element: FilesElement;
}

const FilesManager = ({ element }: FilesManagerProps) => {
  const { extraAttributes } = element;
  const { files } = extraAttributes;
  const [value, setValue] = useState();
  const { updateElement } = useBuilder();

  function addFile(file: UploadedFile) {
    const newFile: File = {
      icon: 'FileText',
      name: file.name!,
      url: file.url!,
    };
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        files: [newFile, ...element.extraAttributes.files],
      },
    });
  }

  return (
    <div>
      <div className="flex flex-wrap p-4 gap-4">
        {files.map((file: File) => (
          <FileItem element={element} file={file} key={file.url} />
        ))}
        <UploadProvider onFileChange={addFile}>
          <FileUploadTrigger>
            <NewFileItem />
          </FileUploadTrigger>
        </UploadProvider>
      </div>
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
