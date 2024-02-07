import { icons } from 'lucide-react';
import { DeliverablesBuilderElement } from './elements/deliverables/DeliverablesBuilderElement';
import { FilesBuilderElement } from './elements/files/FilesBuilderElement';
import { FinancialsBuilderElement } from './elements/financials/FinancialsBuilderElement';
import { LocationsBuilderElement } from './elements/map/LocationsBuilderElement';
import { MoodboardBuilderElement } from './elements/moodboard/MoodboardBuilderElement';
import { PersonsBuilderElement } from './elements/persons/PersonsBuilderElement';
import { SummaryBuilderElement } from './elements/summary/SummaryBuilderElement';
import { VideosBuilderElement } from './elements/videos/VideosBuilderElement';

export type ExtraAttributes<T = Record<string, any>> = {
  label: string;
  helperText: string;
} & T;

export type ElementType =
  | 'summary'
  | 'locations'
  | 'moodboard'
  | 'videos'
  | 'files'
  | 'persons'
  | 'deliverables'
  | 'financials';

export type BuilderElement = {
  type: ElementType;

  construct: (id: string) => BuilderElementInstance;
  buttonComponent: {
    icon: keyof typeof icons;
    label: string;
  };
  builderComponent: React.FC<{
    elementInstance: BuilderElementInstance;
  }>;
  previewComponent: React.FC<{
    elementInstance: BuilderElementInstance;
  }>;
  propertiesComponent?: React.FC<{
    elementInstance: BuilderElementInstance;
  }>;
};

export type BuilderElementInstance<T = Record<string, any>> = {
  id: string;
  type: ElementType;
  extraAttributes: ExtraAttributes<T> | ExtraAttributes;
};

type BuilderElementType = {
  [key in ElementType]: BuilderElement;
};

export const BuilderElements: BuilderElementType = {
  summary: SummaryBuilderElement,
  moodboard: MoodboardBuilderElement,
  locations: LocationsBuilderElement,
  videos: VideosBuilderElement,
  files: FilesBuilderElement,
  persons: PersonsBuilderElement,
  deliverables: DeliverablesBuilderElement,
  financials: FinancialsBuilderElement,
};
