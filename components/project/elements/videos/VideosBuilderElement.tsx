'use client';

import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import VideoGallery from './VideoGallery';

const type: ElementType = 'videos';

const extraAttributes = {
  label: 'Reference Videos',
  helperText: 'This is a videos element.',
  required: false,
  placeholder: 'Enter text here',
  videos: [],
};

export const VideosBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Video',
    label: 'Videos',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Videos Preview Component</div>,
  propertiesComponent: PropertiesComponent,
};

export type VideosCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as VideosCustomInstance;

  return <div>Videos Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as VideosCustomInstance;
  // return <VideoGallery elementInstance={element} />;
  return <VideoGallery elementInstance={element} />;
}
