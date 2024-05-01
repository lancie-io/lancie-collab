import { useView } from '@/components/providers/ViewProvider';
import LucideIcon from '@/components/shared/LucideIcon';
import { Progress } from '@/components/upload/MultiFileDropzone';
import { cn } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { File, FileWarning, icons } from 'lucide-react';
import Link from 'next/link';
import FileEditButton from './FileEditButton';
import { FilesElement } from './FilesBuilderElement';

interface FileItemProps {
  file: Prisma.FileGetPayload<{}>;
  element: FilesElement;
}

function getLucideEmoji({
  type,
}: {
  type?: string | null;
}): keyof typeof icons {
  if (type === 'url') {
    return 'Link';
  }
  return 'File';
}

const FileItem = ({ file }: FileItemProps) => {
  const { name, label, url, emoji, id, type } = file;
  const emojiKey = getLucideEmoji({ type });
  const { isView } = useView();
  return (
    <div className="transition duration-150 relative rounded-md aspect-[5/4] flex flex-col items-center justify-center gap-2 border bg-muted w-[160px] px-3 group cursor-pointer hover:bg-accent hover:border-ring/50">
      <LucideIcon name={emojiKey} className="w-8 h-8" />
      <p className="text-sm whitespace-nowrap w-full overflow-hidden text-center text-ellipsis">
        {label || name || url}
      </p>
      <Link
        className="absolute top-0 left-0 w-full h-full "
        href={file.url}
        target="_blank"
      />
      {!isView && (
        <FileEditButton
          file={file}
          className="absolute top-1 right-1 md:opacity-0 md:group-hover:opacity-100"
        />
      )}
    </div>
  );
};

interface LoadingFileItemProps {
  file: File;
  progress: Progress;
}

export const LoadingFileItem = ({ file, progress }: LoadingFileItemProps) => {
  return (
    <div
      className={cn(
        'relative rounded-md aspect-[5/4] border w-[160px]',
        progress == 'COMPLETE' && 'bg-muted'
      )}
    >
      {typeof progress === 'number' && (
        <div className="absolute w-full h-full top-0 left-0">
          <div
            className="h-full bg-muted transition-all duration-300 ease-in-out text-center"
            style={{
              width: progress ? `${progress}%` : '0%',
            }}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-2 px-3 absolute w-full h-full left-0 top-0">
        {progress === 'PENDING' ? (
          <div className="text-lg font-medium h-8">0%</div>
        ) : progress === 'ERROR' ? (
          <FileWarning className="w-8 h-8 text-red-600" />
        ) : progress !== 'COMPLETE' ? (
          <div className="text-lg font-medium h-8">{Math.round(progress)}%</div>
        ) : (
          <File className="w-8 h-8" />
        )}
        <p className="text-sm whitespace-nowrap w-full overflow-hidden text-center text-ellipsis">
          {file.name}
        </p>
      </div>
    </div>
  );
};

export default FileItem;
