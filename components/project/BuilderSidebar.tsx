import { cn } from '@/lib/utils';
import React from 'react';
import FeedbackButton from '../FeedbackButton';
import ModuleButton from '../builder/ModuleButton';
import { Separator } from '../ui/separator';
import { BuilderElements } from './BuilderElements';

interface BuilderSidebarProps extends React.HTMLAttributes<HTMLBaseElement> {}

const BuilderSidebar = ({ className, ...props }: BuilderSidebarProps) => {
  return (
    <aside
      className={cn('md:border-r overflow-scroll no-scrollbar', className)}
      style={{
        maxWidth: 'min-content',
      }}
    >
      <div
        className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 p-3 grow-0"
        style={{
          width: 'max-content',
        }}
      >
        <ModuleButton builderElement={BuilderElements.summary} />
        <ModuleButton builderElement={BuilderElements.moodboard} />
        <ModuleButton builderElement={BuilderElements.locations} />
        <ModuleButton builderElement={BuilderElements.videos} />
        <ModuleButton builderElement={BuilderElements.files} />
        <ModuleButton builderElement={BuilderElements.persons} disabled />
        <ModuleButton builderElement={BuilderElements.deliverables} disabled />
        <ModuleButton builderElement={BuilderElements.financials} disabled />
      </div>
      <Separator />
      <div className="p-3 text-sm">
        <h2 className="font-medium whitespace-">Need more modules?</h2>
        <p className="text-muted-foreground mt-1">
          The Lancie team is happy to receive suggestions about new modules or
          features.
        </p>
        <FeedbackButton className="w-full mt-2" />
      </div>
    </aside>
  );
};

export default BuilderSidebar;
