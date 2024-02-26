'use client';

import { useLiveblocks } from '@/lib/liveblocks';
import { cn, idGenerator } from '@/lib/utils';
import { useStorage } from '@/liveblocks.config';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useView } from '../providers/ViewProvider';
import { Icons } from '../shared/Icons';
import BuilderElementWrapper from './BuilderElementWrapper';
import { BuilderElements, ElementType } from './BuilderElements';

export const scrollToElementWithRetry = (
  id: any,
  maxRetries = 5,
  retryInterval = 10
) => {
  let retries = 0;

  const scrollToElement = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('pulsate'); // Add pulsate class after scrolling
      setTimeout(() => {
        element.classList.remove('pulsate'); // Remove pulsate class after 2 seconds
      }, 2000);
    } else {
      retries++;
      if (retries < maxRetries) {
        setTimeout(scrollToElement, retryInterval);
      } else {
        console.warn(
          `Element with ID ${id} not found after ${retries} retries`
        );
      }
    }
  };

  scrollToElement();
};

const BuilderArea = () => {
  const { addElement, removeElement } = useLiveblocks();
  const elements = useStorage((root) => root.elements);

  const { isView } = useView();

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
        scrollToElementWithRetry(newElement.id);
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
        scrollToElementWithRetry(newElement.id);
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
      className={cn(
        'grow p-3 md:p-4 lg:p-6 xl:p-8 bg-subtle overflow-scroll no-scrollbar flex flex-col'
      )}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-subtle md:border grow md:p-4 lg:p-6 xl:p-8 rounded-xl flex flex-col w-full max-w-[1200px] mx-auto pb-32 md:pb-48 lg:pb-64 xl:pb-96 relative',
          droppable.isOver && 'ring-2 ring-ring',
          isView && 'p-0 border-none'
        )}
      >
        {elements.length === 0 && !droppable.isOver && (
          <div className="grow flex flex-col items-center justify-center gap-3 md:gap-8 font-semibold text-lg md:text-xl text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icons.dragDrop className="w-4/5 stroke-muted-foreground" />
            Drop here
          </div>
        )}

        {droppable.isOver && elements.length === 0 && (
          <div className="h-[100px] bg-ring rounded-md p-4 w-full" />
        )}
        {elements.length > 0 && (
          <div className="flex flex-col gap-3 md:gap-8 w-full">
            {elements.map((element) => (
              <BuilderElementWrapper key={element.id} element={element} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderArea;
