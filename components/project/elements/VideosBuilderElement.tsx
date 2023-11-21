'use client';

import { Video } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../BuilderElements';

const type: ElementType = 'videos';

const extraAttributes = {
  label: 'Text',
  helperText: 'This is a text element',
  required: false,
  placeholder: 'Enter text here',
};

export const VideosBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Video,
    label: 'Videos',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Videos Preview Component</div>,
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

  return <div>Videos Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="w-full bg-background h-[180px] p-4">
      <div className="aspect-video border-2 border-dashed rounded-md h-full flex flex-col gap-2 items-center justify-center">
        <Video />
        Add video reference
      </div>
    </div>
  );
}
