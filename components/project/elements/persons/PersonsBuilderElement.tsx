'use client';

import {
  Person,
  personsColumns,
  personsData,
} from '@/components/shared/editableTable/columns';
import { ColumnDef } from '@tanstack/react-table';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Persons from './Persons';

const type: ElementType = 'persons';

export type PersonsAttributes = {
  state: TableState;
};

export type PersonsElement = BuilderElementInstance<PersonsAttributes>;

export type TableState = {
  columns: ColumnDef<Person, any>[];
  data: Person[];
};

const extraAttributes = {
  label: 'Persons',
  helperText: 'Assign responsibilities and tasks to persons.',
  state: {
    columns: personsColumns,
    data: personsData,
  },
};

export const PersonsBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Users',
    label: 'Persons',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
};

export type PersonsCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as PersonsCustomInstance;
  return <Persons element={element} isPreview={isPreview} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as PersonsCustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
