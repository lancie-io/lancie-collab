'use client';

import { Paperclip } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../BuilderElements';

const type: ElementType = 'files';

const extraAttributes = {
  label: 'Text',
  helperText: 'This is a text element',
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

type CustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  return <div>Paperclip Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="w-full bg-background min-h-[120px] aspect-[4800/2430]">
      <div>Drop Image here</div>
    </div>
  );
}
