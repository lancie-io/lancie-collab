'use client';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import ModuleButtonBase from '../builder/ModuleButton/ModuleButtonBase';
import BuilderElementContainer from './BuilderElementContainer';
import { BuilderElements, ElementType } from './BuilderElements';
import useBuilder from './hooks/useBuilder';

const DragOverlayWrapper = () => {
  const { elements } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      document.body.style.cursor = 'grabbing';
      setDraggedItem(event.active);
      console.log('onDragStart');
    },
    onDragCancel: () => {
      setDraggedItem(null);
      console.log('onDragCancel');
      document.body.style.cursor = 'auto';
    },
    onDragEnd: () => {
      setDraggedItem(null);
      console.log('onDragEnd');
      document.body.style.cursor = 'auto';
    },
  });

  if (!draggedItem) return null;

  let node = <div>Drag Overlay</div>;
  const isModuleButton = draggedItem.data?.current?.isModuleButton;
  if (isModuleButton) {
    const type = draggedItem.data?.current?.type as ElementType;
    node = <ModuleButtonBase builderElement={BuilderElements[type]} />;
  }
  const isBuilderElement = draggedItem.data?.current?.isBuilderElement;
  if (isBuilderElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((e) => e.id === elementId);

    if (!element) {
      return <div>Element not found</div>;
    } else {
      const BuilderElementComponent =
        BuilderElements[element.type].builderComponent;

      node = (
        <BuilderElementContainer
          isDragging={true}
          className="pointer-events-none opacity-80"
          element={element}
        />
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
