'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useEffect, useState } from 'react';
import { MultiFileDropzone, type FileState } from './MultiFileDropzone';

export type DropzoneFile = {
  name: string;
  url: string;
  size: number;
};

export function MultiFileDropzoneUsage({
  onFileAdded,
  onComplete,
  isRefetching,
}: {
  onFileAdded: (file: DropzoneFile) => void;
  onComplete: () => void;
  isRefetching?: boolean;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  useEffect(() => {
    if (!isRefetching) {
      setFileStates([]);
    }
  }, [isRefetching]);

  return (
    <MultiFileDropzone
      value={fileStates}
      onChange={(files) => {
        setFileStates(files);
      }}
      dropzoneOptions={{
        maxSize: 1024 * 1024 * 10,
      }}
      onFilesAdded={async (addedFiles) => {
        setFileStates([...fileStates, ...addedFiles]);
        await Promise.all(
          addedFiles.map(async (addedFileState) => {
            try {
              const res = await edgestore.publicFiles.upload({
                file: addedFileState.file,
                onProgressChange: async (progress) => {
                  updateFileProgress(addedFileState.key, progress);
                  if (progress === 100) {
                    // wait 1 second to set it to complete
                    // so that the user can see the progress bar at 100%
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    updateFileProgress(addedFileState.key, 'COMPLETE');
                  }
                },
              });
              const newFile: DropzoneFile = {
                name: addedFileState.file.name,
                url: res.url,
                size: addedFileState.file.size,
              };
              console.log('New File: ', newFile);
              onFileAdded(newFile);
              // setFileStates([]);
            } catch (err) {
              updateFileProgress(addedFileState.key, 'ERROR');
            }
          })
        );
        onComplete();
      }}
    />
  );
}
