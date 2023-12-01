import LucideIcon from '@/components/shared/LucideIcon';
import EditButton from './EditButton';
import { File } from './FilesBuilderElement';

interface FileItemProps {
  file: File;
}

const FileItem = ({ file }: FileItemProps) => {
  const { name, label, url } = file;
  return (
    <div className="relative shrink-0 rounded-lg aspect-[5/4] flex flex-col items-center justify-center gap-2 border-2 bg-muted w-[160px] text-muted-foreground">
      <LucideIcon name="Home" className="w-8 h-8" />
      <p className="text-sm">{label || name}</p>
      <EditButton className="absolute top-1 right-1" />
    </div>
  );
};

export default FileItem;
