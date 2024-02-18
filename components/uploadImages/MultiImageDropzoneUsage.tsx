'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { idGenerator } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useBuilder } from '../project/BuilderProvider';
import { MoodboardElement } from '../project/elements/moodboard/MoodboardBuilderElement';
import { MultiImageDropzone, type FileState } from './MultiImageDropzone';

export type DropzoneFile = {
  name: string;
  url: string;
  size: number;
  id?: string;
};

export function MultiImageDropzoneUsage({
  onFileAdded,
  onComplete,
  isRefetching,
  element,
}: {
  onFileAdded: (file: DropzoneFile) => void;
  onComplete: () => void;
  isRefetching?: boolean;
  element: MoodboardElement;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  const { updateElement } = useBuilder();

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
    <MultiImageDropzone
      value={fileStates}
      onChange={(files) => {
        setFileStates(files);
      }}
      dropzoneOptions={{
        maxSize: 1024 * 1024 * 10,
      }}
      onFilesAdded={async (addedFiles) => {
        setFileStates([...fileStates, ...addedFiles]);
        const filesAdded: DropzoneFile[] = [];
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
              id: idGenerator(),
            };
            filesAdded.unshift(newFile);
            updateElement(element.id, {
              ...element,
              extraAttributes: {
                ...element.extraAttributes,
                images: [...filesAdded, ...element.extraAttributes.images],
              },
            });
            //remove latest file from fileStates
            const newFileStates = fileStates.filter(
              (fileState) => fileState.key !== addedFileState.key
            );
            setFileStates(newFileStates);
            // setFileStates([]);
          } catch (err) {
            updateFileProgress(addedFileState.key, 'ERROR');
          }
        });
        console.log('Element Images:', element.extraAttributes.images);
      }}
    />
  );
}
