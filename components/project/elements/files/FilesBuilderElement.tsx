'use client';

import { Paperclip, icons } from 'lucide-react';
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
  label: string;
  url: string;
};

export type FilesAttributes = {
  files: File[];
};

const extraAttributes: ExtraAttributes<FilesAttributes> = {
  label: 'Files Manager',
  helperText: 'Manage any additional files and links.',
  files: [
    {
      icon: 'FileText',
      name: 'lookbook.pdf',
      label: 'Lookbook',
      url: 'https://www.google.com',
    },
  ],
};

export const FilesBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Paperclip,
    label: 'Files',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Files Preview Component</div>,
};

export type FilesElement = BuilderElementInstance<FilesAttributes>;

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: FilesElement;
}) {
  return (
    <div className="w-full bg-background">
      <FilesManager element={elementInstance} />
    </div>
  );
}
