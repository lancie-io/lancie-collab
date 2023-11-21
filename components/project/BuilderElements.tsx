import { DeliverablesBuilderElement } from './elements/DeliverablesElement';
import { FilesBuilderElement } from './elements/FilesBuilderElement';
import { FinancialsBuilderElement } from './elements/FinancialsBuilderElement';
import { MapBuilderElement } from './elements/MapBuilderElement';
import { MoodboardBuilderElement } from './elements/MoodboardBuilderElement';
import { ResponsibilitiesBuilderElement } from './elements/ResponsibilitiesElement';
import { SummaryBuilderElement } from './elements/SummaryBuilderElement';
import { VideosBuilderElement } from './elements/VideosBuilderElement';

export type ElementType =
  | 'summary'
  | 'map'
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
  propertiesComponent: React.FC<{
    elementInstance: BuilderElementInstance;
  }>;
};

export type BuilderElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, any>;
};

type BuilderElementType = {
  [key in ElementType]: BuilderElement;
};

export const BuilderElements: BuilderElementType = {
  summary: SummaryBuilderElement,
  moodboard: MoodboardBuilderElement,
  map: MapBuilderElement,
  videos: VideosBuilderElement,
  files: FilesBuilderElement,
  responsibilities: ResponsibilitiesBuilderElement,
  deliverables: DeliverablesBuilderElement,
  financials: FinancialsBuilderElement,
};
