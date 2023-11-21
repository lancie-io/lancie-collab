'use client';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { BuilderElements, ElementType } from './BuilderElements';
import { ModuleButtonOverlay } from './ModuleButton';
import useBuilder from './hooks/useBuilder';

const DragOverlayWrapper = () => {
  const { elements } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
      console.log('onDragStart');
    },
    onDragCancel: () => {
      setDraggedItem(null);
      console.log('onDragCancel');
    },
    onDragEnd: () => {
      setDraggedItem(null);
      console.log('onDragEnd');
    },
  });

  if (!draggedItem) return null;

  let node = <div>Drag Overlay</div>;
  const isModuleButton = draggedItem.data?.current?.isModuleButton;
  if (isModuleButton) {
    const type = draggedItem.data?.current?.type as ElementType;
    node = <ModuleButtonOverlay builderElement={BuilderElements[type]} />;
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
        <div className="pointer-events-none opacity-80">
          <BuilderElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
