import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { GripHorizontal } from 'lucide-react';
import { BuilderElementInstance } from '../../BuilderElements';
import CommentButton from './CommentButton';
import MoreButton from './MoreButton';

type DraggableHookReturnType = ReturnType<typeof useDraggable>;

interface ModuleBarProps {
  element: BuilderElementInstance;
  draggable?: DraggableHookReturnType;
  isDragging?: boolean;
}

const ModuleBar = ({ element, draggable, isDragging }: ModuleBarProps) => {
  const { label } = element.extraAttributes;
  return (
    <div
      className="flex items-center h-12 border-b gap-2 px-3 relative justify-between"
      ref={draggable?.setNodeRef}
    >
      <div className="flex items-center gap-2">
        <div className="h-4 w-1 bg-primary rounded-lg" />
        <span className="font-medium">{label}</span>
      </div>
      <button
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-16 h-10 group text-muted-foreground/50 cursor-grab"
        {...draggable?.attributes}
        {...draggable?.listeners}
      >
        <GripHorizontal
          className={cn(
            'group-hover:text-foreground',
            isDragging && 'text-foreground'
          )}
        />
      </button>
      <div className="flex items-center gap-2">
        <CommentButton element={element} />
        <MoreButton element={element} />
      </div>
    </div>
  );
};

export default ModuleBar;
