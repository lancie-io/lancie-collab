import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import LucideIcon from '../shared/LucideIcon';

type CustomDropzoneProps = {
  getRootProps: any;
  getInputProps: any;
  dropZoneClassName: string;
  customError?: string; // Define custom error prop
  errorMessage?: string;
};

const CustomDropzone = forwardRef<HTMLInputElement, CustomDropzoneProps>(
  (
    {
      getRootProps,
      getInputProps,
      dropZoneClassName,
      customError,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div
        {...getRootProps({
          className: cn(
            dropZoneClassName,
            'relative w-[160px] aspect-[5/4] rounded-md flex flex-col gap-2 items-center justify-center px-3 hover:border-ring/50 hover:bg-accent'
          ),
        })}
      >
        <input ref={ref} {...getInputProps()} />
        <LucideIcon name={'UploadCloud'} className="w-8 h-8" />
        <p className="text-sm whitespace-nowrap w-full overflow-hidden text-center text-ellipsis ">
          Upload
        </p>
        <div className="absolute bottom-2 text-2xs text-red-500">
          {customError ?? errorMessage}
        </div>
      </div>
    );
  }
);

CustomDropzone.displayName = 'CustomDropzone';

export default CustomDropzone;
