import { cn } from '@/lib/utils';
import { File, FileWarning } from 'lucide-react';
import { Progress } from './MultiImageDropzone';

interface LoadingImageItemProps {
  file: File;
  progress: Progress;
}

export const LoadingImageItem = ({ file, progress }: LoadingImageItemProps) => {
  return (
    <div
      className={cn(
        'relative rounded-md aspect-[5/5] border w-full',
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
