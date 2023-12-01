'use client';

import { Map } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
  ExtraAttributes,
} from '../../BuilderElements';
import Locations from './Locations';
import { GoogleLocation } from './PlacesAutocomplete';

const type: ElementType = 'locations';

export type LocationsAttributes = {
  locations: GoogleLocation[];
};

export type LocationsElement = BuilderElementInstance<LocationsAttributes>;

const extraAttributes: ExtraAttributes<LocationsAttributes> = {
  label: 'Locations',
  helperText: 'This is a locations element.',
  locations: [],
};

export const LocationsBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Map,
    label: 'Locations',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Locations Preview Component</div>,
};

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance<LocationsAttributes>;
}) {
  return <Locations element={elementInstance} />;
}
