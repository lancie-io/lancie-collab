'use client';

import { cn, idGenerator } from '@/lib/utils';
import { useBroadcastEvent, useEventListener } from '@/liveblocks.config';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Prisma } from '@prisma/client';
import isEqual from 'lodash.isequal';
import { useEffect } from 'react';
import { Icons } from '../shared/Icons';
import BuilderElementWrapper from './BuilderElementWrapper';
import { BuilderElements, ElementType } from './BuilderElements';
import useBuilder from './hooks/useBuilder';

interface BuilderAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Prisma.ProjectGetPayload<{}>;
}

const BuilderArea = ({ project, children }: BuilderAreaProps) => {
  const {
    elements,
    setElements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useBuilder();

  const broadcast = useBroadcastEvent();
  useEffect(() => {
    console.log('elements changed');
    broadcast({ type: 'elements', data: elements });
  }, [elements]);

  useEventListener(({ event, user, connectionId }: any) => {
    //                       ^^^^ Will be Client A
    // Do something
    const newElements = event.data;
    if (!isEqual(elements, newElements)) {
      setElements(newElements);
    }
  });

  useEffect(() => {
    const elementsFromServer = JSON.parse(project.content as string);

    setElements(elementsFromServer || []);
  }, [project]);
  const droppable = useDroppable({
    id: 'builder-area',
    data: {
      isBuilderArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isModuleButton = active.data?.current?.isModuleButton;
      const isDroppingOverBuilderArea = over.data?.current?.isBuilderArea;

      const isDroppingOverDropArea =
        isModuleButton && isDroppingOverBuilderArea;
      if (isDroppingOverDropArea) {
        const type = active.data?.current?.type;
        const newElement = BuilderElements[type as ElementType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }
      const isDroppingOverBuilderElementTopHalf =
        over.data?.current?.isTopHalfBuilderElement;

      const isDroppingOverBuilderElementBottomHalf =
        over.data?.current?.isBottomHalfBuilderElement;

      const isDroppingOverBuilderElement =
        isDroppingOverBuilderElementTopHalf ||
        isDroppingOverBuilderElementBottomHalf;

      const isDroppingModuleButtonOverBuilderElement =
        isModuleButton && isDroppingOverBuilderElement;

      if (isDroppingModuleButtonOverBuilderElement) {
        const type = active.data?.current?.type;
        const newElement = BuilderElements[type as ElementType].construct(
          idGenerator()
        );
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }
      const isDraggingBuilderElement = active.data?.current?.isBuilderElement;

      const isDraggingBuilderElementOverAnotherBuilderElement =
        isDraggingBuilderElement && isDroppingOverBuilderElement;

      if (isDraggingBuilderElementOverAnotherBuilderElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }
        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);
        let indexForNewElement = overElementIndex;
        if (isDroppingOverBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div
      className="grow p-4 lg:p-6 xl:p-8 bg-subtle overflow-scroll no-scrollbar flex flex-col"
      // onClick={(e) => {
      //   console.log('area clicked');
      //   e.stopPropagation();
      //   if (selectedElement) setSelectedElement(null);
      // }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-subtle border grow p-8 rounded-xl flex flex-col',
          droppable.isOver && 'ring-2 ring-ring'
        )}
      >
        {elements.length === 0 && !droppable.isOver && (
          <div className="grow flex flex-col items-center justify-center gap-8 font-semibold text-xl text-muted-foreground">
            <Icons.dragDrop className="w-2/5 stroke-muted-foreground" />
            Drop here
          </div>
        )}

        {droppable.isOver && elements.length === 0 && (
          <div className="h-[100px] bg-ring rounded-md p-4 w-full" />
        )}
        {elements.length > 0 && (
          <div className="flex flex-col gap-8 w-full">
            {elements.map((element) => (
              <BuilderElementWrapper key={element.id} element={element} />
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default BuilderArea;
