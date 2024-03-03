import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { useUpdateMyPresence } from '@/liveblocks.config';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { HTMLAttributes, memo, useCallback, useRef } from 'react';
import { BuilderElementInstance, BuilderElements } from './BuilderElements';
import SelectionTags from './SelectionTags';
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
  const updateMyPresence = useUpdateMyPresence();
  const handleClick = useCallback(() => {
    updateMyPresence({ selectedModule: element.id });
  }, [element.id]);
  const clickRef = useRef(null);
  useClickOutside(
    clickRef,
    (e: any) => updateMyPresence({ selectedModule: null }),
    'module'
    // console.log('updated presence')
  );
  return (
    <motion.div
      ref={clickRef}
      layoutId={isDragging ? undefined : element.id}
      className={cn('border bg-background rounded-lg relative', className)}
      onClick={handleClick}
    >
      <SelectionTags elementId={element.id} />
      <ModuleBar
        isDragging={isDragging}
        draggable={draggable}
        element={element}
      />

      <BuilderElement elementInstance={element} />
    </motion.div>
  );
};

export default memo(BuilderElementContainer);
