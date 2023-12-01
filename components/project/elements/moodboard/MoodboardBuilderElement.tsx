'use client';

import { Image, Link, StickyNote, Upload } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
  ExtraAttributes,
} from '../../BuilderElements';
import Moodboard from './Moodboard';

const type: ElementType = 'moodboard';

export type TImage = {
  url: string;
};

export type MoodboardAttributes = {
  images: TImage[];
};

export type MoodboardElement = BuilderElementInstance<MoodboardAttributes>;

const extraAttributes: ExtraAttributes<MoodboardAttributes> = {
  label: 'Moodboard',
  helperText: 'This is a moodboard element.',
  images: [],
};

export const MoodboardBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: Image,
    label: 'Moodboard',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Moodboard Preview Component</div>,
};

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance<MoodboardAttributes>;
}) {
  return <Moodboard element={elementInstance} />;
}

const Toolbar = () => {
  return (
    <div className="absolute bottom-4 bg-foreground rounded-lg flex items-center gap-2 p-2 text-background">
      <BarIcon icon={Link} />
      <BarIcon icon={Upload} />
      <BarIcon icon={StickyNote} />
    </div>
  );
};

interface BarIconProps {
  icon: React.ElementType;
}
const BarIcon = (props: BarIconProps) => {
  const { icon: Icon } = props;
  return (
    <div>
      <Icon className="text-muted hover:text-background w-5 h-5" />
    </div>
  );
};
