'use client';

import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
  ExtraAttributes,
} from '../../BuilderElements';
import Moodboard from './Moodboard';

const type: ElementType = 'moodboard';

export type TImage = {
  url: string;
  id: string;
};

export type MoodboardAttributes = {
  images: TImage[];
};

export type MoodboardElement = BuilderElementInstance<MoodboardAttributes>;

const extraAttributes: ExtraAttributes<MoodboardAttributes> = {
  label: 'Moodboard',
  helperText: 'This is a moodboard element.',
  images: [],
};

type CustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export const MoodboardBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Image',
    label: 'Moodboard',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance<MoodboardAttributes>;
  isPreview?: boolean;
}) {
  return <Moodboard element={elementInstance} isPreview={isPreview} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
