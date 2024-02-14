import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { HTMLAttributes } from 'react';
import { BuilderElementInstance, BuilderElements } from './BuilderElements';
import ModuleBar from './elements/shared/ModuleBar';

type DraggableHookReturnType = ReturnType<typeof useDraggable>;

interface BuilderElementContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'draggable'> {
  element: BuilderElementInstance;
  draggable?: DraggableHookReturnType;
  isDragging?: boolean;
}

const BuilderElementContainer = ({
  element,
  className,
  draggable,
  isDragging,
}: BuilderElementContainerProps) => {
  const BuilderElement = BuilderElements[element.type].builderComponent;
  return (
    <motion.div
      layoutId={isDragging ? undefined : element.id}
      className={cn(
        'border bg-background rounded-lg overflow-hidden relative',
        className
      )}
    >
      <ModuleBar
        isDragging={isDragging}
        draggable={draggable}
        element={element}
      />
      <BuilderElement elementInstance={element} />
    </motion.div>
  );
};

export default BuilderElementContainer;
