import { DeliverablesBuilderElement } from './elements/DeliverablesElement';
import { FilesBuilderElement } from './elements/files/FilesBuilderElement';
import { FinancialsBuilderElement } from './elements/FinancialsBuilderElement';
import { LocationsBuilderElement } from './elements/map/LocationsBuilderElement';
import { MoodboardBuilderElement } from './elements/moodboard/MoodboardBuilderElement';
import { ResponsibilitiesBuilderElement } from './elements/ResponsibilitiesElement';
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
  | 'responsibilities'
  | 'deliverables'
  | 'financials';

export type BuilderElement = {
  type: ElementType;

  construct: (id: string) => BuilderElementInstance;
  buttonComponent: {
    icon: React.ElementType;
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
  responsibilities: ResponsibilitiesBuilderElement,
  deliverables: DeliverablesBuilderElement,
  financials: FinancialsBuilderElement,
};
