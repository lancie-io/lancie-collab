'use client';

import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
  ExtraAttributes,
} from '../../BuilderElements';

const type: ElementType = 'moodboard';

export type TImage = {
  url: string;
};

export type CanvasAttributes = {};

export type CanvasElement = BuilderElementInstance<CanvasAttributes>;

const extraAttributes: ExtraAttributes<CanvasAttributes> = {
  label: 'Canvas',
  helperText: 'This is a canvas element.',
};

type CustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const CanvasBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Presentation',
    label: 'Canvas',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance<CanvasAttributes>;
  isPreview?: boolean;
}) {
  return <div>Canvas</div>;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
