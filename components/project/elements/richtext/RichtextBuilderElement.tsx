'use client';

import { z } from 'zod';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Tiptap from './TipTap';

const type: ElementType = 'richtext';

const extraAttributes = {
  label: 'Rich Text',
  helperText: 'This is a richtext element',
  required: false,
  placeholder: 'Enter text here',
  content: '',
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
});

export const RichtextBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Pen',
    label: 'Rich Text',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

export type CustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as CustomInstance;
  return <Tiptap elementInstance={element} isPreview={isPreview} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
