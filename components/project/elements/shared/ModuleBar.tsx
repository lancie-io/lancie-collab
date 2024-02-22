import { Input } from '@/components/ui/input';
import { useLiveblocks } from '@/lib/liveblocks';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { GripHorizontal } from 'lucide-react';
import { useState } from 'react';
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
  const { updateElement } = useLiveblocks();
  const handleFocus = (event: any) => event.target.select();
  function updateLabel(newLabelValue: string) {
    if (newLabelValue === '') {
      setValue(label);
      return;
    }
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        label: newLabelValue,
      },
    });
  }

  const [value, setValue] = useState(label);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
      updateLabel(value);
    }
  };

  return (
    <div
      className="flex items-center h-12 border-b gap-2 px-3 relative justify-between"
      ref={draggable?.setNodeRef}
    >
      <div className="flex items-center gap-2">
        <div className="h-4 w-1 bg-primary rounded-lg" />
        {/* <span className="font-medium hover:bg-accent">{label}</span> */}
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-6 px-0 min-w-[0px] border-none font-medium hover:bg-accent"
          style={{
            width: `${value.length * 8 + 4}px`,
          }}
          onFocus={handleFocus}
          onBlur={() => updateLabel(value)}
          onKeyDown={handleKeyDown}
        />
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
