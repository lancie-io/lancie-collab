import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import ErrorBoundary from '../shared/ErrorBoundary';
import BuilderElementContainer from './BuilderElementContainer';
import { BuilderElementInstance } from './BuilderElements';

function BuilderElementWrapper({
  element,
}: {
  element: BuilderElementInstance;
}) {
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

  if (draggable.isDragging) return null;
  return (
    <ErrorBoundary info={element.type}>
      <div className="relative" id={`module-${element.id}`}>
        <div
          ref={topHalf.setNodeRef}
          className={cn('absolute top-0 w-full h-1/2')}
        />
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute bottom-0 w-full h-1/2"
        />
        {topHalf.isOver && (
          <div className="absolute -top-5 w-full h-2 bg-foreground rounded-lg" />
        )}
        {bottomHalf.isOver && (
          <div className="absolute -bottom-5 w-full h-2 bg-foreground rounded-lg" />
        )}

        <BuilderElementContainer draggable={draggable} element={element} />
      </div>
    </ErrorBoundary>
  );
}

export default BuilderElementWrapper;
