'use client';

import UploadProvider, {
  UploadedFile,
} from '@/components/shared/upload/UploadProvider';
import { useLiveblocks } from '@/lib/liveblocks';
import { icons } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
  ExtraAttributes,
} from '../../BuilderElements';
import FilesManager from './FilesManager';

const type: ElementType = 'files';

export type File = {
  icon: keyof typeof icons;
  name: string;
  label?: string;
  url: string;
};

export type FilesAttributes = {
  files: File[];
};

const extraAttributes: ExtraAttributes<FilesAttributes> = {
  label: 'Files Manager',
  helperText: 'Manage any additional files and links.',
  files: [],
};

export const FilesBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Paperclip',
    label: 'Files',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Files Preview Component</div>,
};

export type FilesElement = BuilderElementInstance<FilesAttributes>;

export type FilesManagerCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance: element,
}: {
  elementInstance: FilesElement;
}) {
  const { updateElement } = useLiveblocks();
  function addFile(file: UploadedFile) {
    const newFile: File = {
      icon: 'FileText',
      name: file.name!,
      url: file.url!,
    };
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        files: [newFile, ...element.extraAttributes.files],
      },
    });
  }
  return (
    <UploadProvider onFileChange={addFile}>
      <FilesManager element={element} />
    </UploadProvider>
  );
}
