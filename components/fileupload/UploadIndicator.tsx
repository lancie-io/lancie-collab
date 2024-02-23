import { cn } from '@/lib/utils';
import { FileState } from './types';

interface UploadIndicatorProps {
  fileStates: FileState[];
  className?: string;
}

const UploadIndicator = ({ fileStates, className }: UploadIndicatorProps) => {
  return (
    <div className={cn('absolute w-full h-full top-0 left-0', className)}>
      <div
        className="h-full bg-muted transition-all duration-300 ease-in-out text-center"
        style={{
          width: fileStates[fileStates.length - 1]?.progress
            ? `${fileStates[fileStates.length - 1]?.progress}%`
            : '0%',
        }}
      />
      <div className="flex flex-col gap-2 items-center justify-center absolute w-full h-full left-0 top-0">
        <p className="h-8 font-semibold text-xl">
          {fileStates[fileStates.length - 1]?.progress}%
        </p>
        <p className="text-sm whitespace-nowrap font-medium w-full overflow-hidden text-center text-ellipsis">
          {fileStates[fileStates.length - 1].file.name}
        </p>
      </div>
    </div>
  );
};

export default UploadIndicator;
