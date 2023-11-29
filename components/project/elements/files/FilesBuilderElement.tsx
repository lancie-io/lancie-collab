'use client';

import { Paperclip } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import FilesManager from './FilesManager';

const type: ElementType = 'files';

const extraAttributes = {
  label: 'Files Manager',
  helperText: 'This is a files element.',
  required: false,
  placeholder: 'Enter text here',
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
  previewComponent: () => <div>Moodboard Preview Component</div>,
  propertiesComponent: PropertiesComponent,
};

export type FilesCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  return <div>Paperclip Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as FilesCustomInstance;
  return (
    <div className="w-full bg-background">
      <FilesManager element={element} />
    </div>
  );
}
