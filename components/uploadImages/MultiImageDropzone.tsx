'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import LucideIcon from '../shared/LucideIcon';
import { LoadingImageItem } from './LoadingImageItem';
import { formatFileSize } from './utils';

const variants = {
  base: 'rounded-md cursor-pointer border-2 border-dashed transition-colors duration-200 ease-in-out',
  active: '',
  disabled: 'cursor-default pointer-events-none opacity-20',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type Progress = 'PENDING' | 'COMPLETE' | 'ERROR' | number;

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: Progress;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const MultiImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onFilesAdded, onChange },
    ref
  ) => {
    const [customError, setCustomError] = React.useState<string>();
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (files) {
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: 'PENDING',
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(value ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <>
        <div>
          {/* Main File Input */}
          <div
            {...getRootProps({
              className: cn(
                dropZoneClassName,
                'relative w-full aspect-[5/5] rounded-md flex flex-col gap-2 items-center justify-center px-3 hover:border-ring/50 hover:bg-accent'
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

          {/* Error Text */}
        </div>

        {/* Selected Files */}
        {value?.map(({ file, progress }, i) => (
          <LoadingImageItem key={i} file={file} progress={progress} />
        ))}
      </>
    );
  }
);
MultiImageDropzone.displayName = 'MultiImageDropzone';

export { MultiImageDropzone };
