'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { cn, idGenerator } from '@/lib/utils';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import LucideIcon from '../shared/LucideIcon';
import { useUpload } from './Upload';
import UploadIndicator from './UploadIndicator';
import { FileState, InputProps } from './types';
import { formatFileSize } from './utils';

const variants = {
  base: 'rounded-md cursor-pointer border-2 border-dashed transition-colors duration-200 ease-in-out',
  active: '',
  disabled: 'cursor-default pointer-events-none opacity-20',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
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

const UploadTrigger = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, value, className, disabled, noClick = false }, ref) => {
    const {
      fileStates,
      setFileStates,
      updateFileProgress,
      uploadOptions,
      onUpload,
      isUploading,
      setIsUploading,
    } = useUpload();

    const { edgestore } = useEdgeStore();
    const [customError, setCustomError] = React.useState<string>();
    if (uploadOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= uploadOptions.maxFiles;
    }

    function getIsMultipleAllowed() {
      let isMultipleAllowed = true;
      if (uploadOptions?.type === 'single') {
        isMultipleAllowed = false;
      }
      if (uploadOptions?.maxFiles && uploadOptions.maxFiles < 2) {
        isMultipleAllowed = false;
      }

      return isMultipleAllowed;
    }

    const onCustomDrop = async (acceptedFiles: any) => {
      setIsUploading(true);
      const files: File[] = acceptedFiles;
      setCustomError(undefined);
      if (
        uploadOptions?.maxFiles &&
        (value?.length ?? 0) + files.length > uploadOptions.maxFiles
      ) {
        setCustomError(ERROR_MESSAGES.tooManyFiles(uploadOptions.maxFiles));
        return;
      }
      if (files) {
        const addedFiles = files.map<FileState>((file) => ({
          file,
          key: idGenerator(),
          progress: 'PENDING',
        }));
        setFileStates([...fileStates, ...addedFiles]);
        await Promise.all(
          addedFiles.map(async (addedFileState) => {
            try {
              const res = await edgestore.publicFiles.upload({
                file: addedFileState.file,
                onProgressChange: async (progress) => {
                  updateFileProgress(addedFileState.key, progress);
                  if (progress === 100) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    updateFileProgress(addedFileState.key, 'COMPLETE');
                  }
                },
              });
              const uploadedFile = {
                name: addedFileState.file.name,
                url: res.url,
              };
              console.log('uploaded file', uploadedFile);
              console.log('uploaded to edgestore');
              onUpload?.(uploadedFile);

              console.log('uploaded to db');
              const newFileStates = fileStates.filter(
                (fileState) => fileState.key !== addedFileState.key
              );
              setFileStates(newFileStates);
              console.log('uploaded filestate');
            } catch (err) {
              updateFileProgress(addedFileState.key, 'ERROR');
            }
          })
        );
        // setFileStates([...(fileStates ?? []), ...addedFiles]);
      }
      setIsUploading(false);
    };

    // dropzone configurat ion
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      multiple: getIsMultipleAllowed(),
      disabled,
      noClick,
      onDrop: onCustomDrop,
      ...uploadOptions,
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
          return ERROR_MESSAGES.fileTooLarge(uploadOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(uploadOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, uploadOptions]);
    //first check whether any of the children is anything other than null or false
    function checkChildren(children: React.ReactNode) {
      let isChildren = false;
      React.Children.forEach(children, (child) => {
        if (child) {
          isChildren = true;
        }
      });
      return isChildren;
    }
    if (checkChildren(children)) {
      return (
        <div {...getRootProps()} className="cursor-pointer">
          <input ref={ref} {...getInputProps()} />
          {children}
        </div>
      );
    }

    const isSingleLoading =
      uploadOptions?.type === 'single' &&
      typeof fileStates[fileStates.length - 1]?.progress === 'number';

    return (
      <div
        {...getRootProps({
          className: cn(
            'relative overflow-hidden w-full h-full rounded-md px-3 hover:border-ring/50 hover:bg-accent cursor-pointer',
            dropZoneClassName,
            isSingleLoading && 'pointer-events-none'
          ),
        })}
      >
        {isSingleLoading && <UploadIndicator fileStates={fileStates} />}
        <div className="w-full h-full relative flex flex-col gap-2 items-center justify-center">
          <input ref={ref} {...getInputProps()} />
          {isSingleLoading ? (
            <p className="h-8 font-semibold text-xl">
              {fileStates[fileStates.length - 1]?.progress}%
            </p>
          ) : (
            <LucideIcon name={'UploadCloud'} className="w-8 h-8" />
          )}
          <p className="text-sm whitespace-nowrap font-medium w-full overflow-hidden text-center text-ellipsis ">
            {isSingleLoading
              ? fileStates[fileStates.length - 1].file.name
              : 'Upload'}
          </p>
          <div className="absolute bottom-2 text-2xs text-red-500">
            {customError ?? errorMessage}
          </div>
        </div>
      </div>
    );
  }
);
UploadTrigger.displayName = 'UploadTrigger';

export { UploadTrigger };
