'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import FeedbackButton from '../FeedbackButton';
import ModuleButton from '../builder/ModuleButton';
import { useView } from '../providers/ViewProvider';
import { Separator } from '../ui/separator';
import { BuilderElements } from './BuilderElements';

interface BuilderSidebarProps extends React.HTMLAttributes<HTMLBaseElement> {}

const BuilderSidebar = ({ className }: BuilderSidebarProps) => {
  const { isView } = useView();
  if (isView) {
    return null;
  }
  return (
    <aside
      className={cn(
        'md:border-r overflow-scroll no-scrollbar shrink-0',
        className
      )}
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
        {/* <ModuleButton builderElement={BuilderElements.canvas} disabled /> */}
        <ModuleButton builderElement={BuilderElements.summary} single />
        <ModuleButton builderElement={BuilderElements.richtext} />
        <ModuleButton builderElement={BuilderElements.moodboard} />
        <ModuleButton builderElement={BuilderElements.locations} />
        <ModuleButton builderElement={BuilderElements.videos} />
        <ModuleButton builderElement={BuilderElements.files} single />
        <ModuleButton builderElement={BuilderElements.persons} />
        <ModuleButton builderElement={BuilderElements.deliverables} />
        <ModuleButton builderElement={BuilderElements.financials} />
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
