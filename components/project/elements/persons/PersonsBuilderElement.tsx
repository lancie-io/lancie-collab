'use client';

import { Users } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Persons from './Persons';
import { personsColumns, personsData } from './personsColumns';

const type: ElementType = 'persons';

export type PersonsAttributes = {
  state: {
    columns: any[];
    data: any[];
    skipReset: boolean;
  };
};

export type PersonsElement = BuilderElementInstance<PersonsAttributes>;

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
    icon: Users,
    label: 'Persons',
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
  return <Persons element={element} isPreview={isPreview} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
