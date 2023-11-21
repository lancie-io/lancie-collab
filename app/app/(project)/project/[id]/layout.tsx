import BuilderContextProvider from '@/components/project/BuilderContext';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import DndProvider from '@/components/providers/DndProvider';
import React from 'react';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BuilderContextProvider>
      <DndProvider>
        {children} <DragOverlayWrapper />
      </DndProvider>
    </BuilderContextProvider>
  );
};

export default BuilderLayout;
