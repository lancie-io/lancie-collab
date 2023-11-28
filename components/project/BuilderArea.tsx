'use client';

import { cn, idGenerator } from '@/lib/utils';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { Prisma } from '@prisma/client';
import { useEffect } from 'react';
import {
  BuilderElementInstance,
  BuilderElements,
  ElementType,
} from './BuilderElements';
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
      console.log('DRAG END', event);
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
        console.log('newElement', newElement);
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
      className="grow py-12 px-24 bg-muted/50 overflow-scroll flex flex-col"
      // onClick={(e) => {
      //   console.log('area clicked');
      //   e.stopPropagation();
      //   if (selectedElement) setSelectedElement(null);
      // }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-background border grow p-4 rounded-xl flex flex-col',
          droppable.isOver && 'ring-2 ring-primary/50'
        )}
      >
        {elements.length === 0 && !droppable.isOver && (
          <div className="grow grid place-items-center font-semibold text-xl">
            Drop here
          </div>
        )}

        {droppable.isOver && elements.length === 0 && (
          <div className="h-[100px] bg-primary/20 rounded-md p-4 w-full" />
        )}
        {elements.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
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

function BuilderElementWrapper({
  element,
}: {
  element: BuilderElementInstance;
}) {
  const { selectedElement, setSelectedElement } = useBuilder();

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfBuilderElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfBuilderElement: true,
    },
  });

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isBuilderElement: true,
    },
  });

  const BuilderElement = BuilderElements[element.type].builderComponent;

  if (draggable.isDragging) return null;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative"
      // onClick={(e) => {
      //   e.stopPropagation();
      //   setSelectedElement(element);
      // }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute top-0 w-full h-1/2')}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2"
      />
      {topHalf.isOver && (
        <div className="absolute -top-3 w-full h-2 bg-foreground rounded-lg" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute -bottom-3 w-full h-2 bg-foreground rounded-lg" />
      )}
      <div className="border-2 border-ring/20 bg-background rounded-md overflow-hidden relative z-10">
        <BuilderElement elementInstance={element} />
      </div>
    </div>
  );
}

export default BuilderArea;
