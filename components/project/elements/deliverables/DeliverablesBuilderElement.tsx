'use client';

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
    icon: 'Group',
    label: 'Deliverables',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

export type DeliverablesCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as DeliverablesCustomInstance;
  return <Deliverables isPreview={isPreview} element={element} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as DeliverablesCustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
