'use client';

import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Financials from './Financials';
import { financialsColumns, financialsData } from './financialsColumns';

const type: ElementType = 'financials';

export type FinancialsAttributes = {
  state: {
    columns: any[];
    data: any[];
    skipReset: boolean;
  };
};

export type FinancialsElement = BuilderElementInstance<FinancialsAttributes>;

const extraAttributes = {
  label: 'Financials',
  helperText: 'Assign responsibilities and tasks to persons.',
  state: {
    columns: financialsColumns,
    data: financialsData,
  },
};

export const FinancialsBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Coins',
    label: 'Financials',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

export type FinancialsCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as FinancialsCustomInstance;
  return <Financials isPreview={isPreview} element={element} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as FinancialsCustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
