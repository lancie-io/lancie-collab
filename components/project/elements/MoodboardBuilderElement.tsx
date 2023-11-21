'use client';

import { Image, Link, StickyNote, Upload } from 'lucide-react';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../BuilderElements';

const type: ElementType = 'moodboard';

const extraAttributes = {
  label: 'Text',
  helperText: 'This is a text element',
  required: false,
  placeholder: 'Enter text here',
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

  return <div>Moodboard Properties Component</div>;
}

function BuilderComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="relative w-full bg-muted aspect-[2/1] shadow-inner grid place-items-center">
      <div className="text-xl font-semibold">Drop Images</div>
      <Toolbar />
    </div>
  );
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
