'use client';

import { Group } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Deliverables from './Deliverables';
import { deliverablesColumns, deliverablesData } from './deliverablesColumns';

const type: ElementType = 'deliverables';

export type DeliverablesAttributes = {
  state: {
    columns: any[];
    data: any[];
    skipReset: boolean;
  };
};

export type DeliverablesElement =
  BuilderElementInstance<DeliverablesAttributes>;

const extraAttributes = {
  label: 'Deliverables',
  helperText: 'Assign responsibilities and tasks to persons.',
  state: {
    columns: deliverablesColumns,
    data: deliverablesData,
  },
};

export const DeliverablesBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Group,
    label: 'Deliverables',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
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

  return <div>Persons Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as CustomInstance;
  return <Deliverables isPreview={isPreview} element={element} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
