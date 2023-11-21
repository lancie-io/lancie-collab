'use client';

import OptimizedImage from '@/components/shared/OptimizedImage';
import { Map } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../BuilderElements';

const type: ElementType = 'map';

const extraAttributes = {
  label: 'Text',
  helperText: 'This is a text element',
  required: false,
  placeholder: 'Enter text here',
};

export const MapBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Map,
    label: 'Location',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Map Preview Component</div>,
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

  return <div>Map Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="w-full bg-background min-h-[120px] aspect-[4800/2430]">
      <OptimizedImage src="https://res.cloudinary.com/du3mz9iny/image/upload/v1699616855/map-placeholder_xzu6cj.jpg" />
    </div>
  );
}
