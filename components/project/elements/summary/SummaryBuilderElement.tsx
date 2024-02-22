'use client';

import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Summary from './Summary';

const type: ElementType = 'summary';

const extraAttributes = {
  label: 'Summary',
  helperText: 'This is a summary element',
  required: false,
  placeholder: 'Enter text here',
  content: '',
  settings: {
    title: true,
    description: true,
    cover: true,
    production: true,
    publishing: true,
  },
  description: '',
  production: undefined,
  publishing: undefined,
};

export const SummaryBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Sparkle',
    label: 'Summary',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

export type SettingsCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as SettingsCustomInstance;
  return <Summary element={element} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as SettingsCustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
