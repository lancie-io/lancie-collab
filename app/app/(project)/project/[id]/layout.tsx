import BuilderContextProvider from '@/components/project/BuilderContext';
import DragOverlayWrapper from '@/components/project/DragOverlayWrapper';
import DndProvider from '@/components/providers/DndProvider';
import React from 'react';
import { Room } from './Room';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Room>
      <BuilderContextProvider>
        <DndProvider>
          {children} <DragOverlayWrapper />
        </DndProvider>
      </BuilderContextProvider>
    </Room>
  );
};

export default BuilderLayout;
