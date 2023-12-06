import LucideIcon from '@/components/shared/LucideIcon';
import EditButton from './EditButton';
import { File, FilesElement } from './FilesBuilderElement';

interface FileItemProps {
  file: File;
  element: FilesElement;
}

const FileItem = ({ element, file }: FileItemProps) => {
  const { name, label, url, icon = 'FileText' } = file;
  return (
    <div className="relative shrink-0 rounded-lg aspect-[5/4] flex flex-col items-center justify-center gap-2 border-2 bg-muted w-[160px] text-muted-foreground overflow-hidden">
      <LucideIcon name={icon} />
      <p className="text-sm whitespace-nowrap w-full overflow-hidden text-right text-ellipsis ">
        {label || name}
      </p>
      <EditButton
        element={element}
        file={file}
        className="absolute top-1 right-1"
      />
    </div>
  );
};

export default FileItem;
