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
  helperText: 'Upload and discuss reference video material.',
  required: false,
  videos: [],
};

export type VideosCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
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
};

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as VideosCustomInstance;
  return <VideoGallery element={element} />;
}
