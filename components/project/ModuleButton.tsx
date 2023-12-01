'use client';

import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '../ui/button';
import { BuilderElement } from './BuilderElements';

interface ModuleButtonProps {
  builderElement: BuilderElement;
  disabled?: boolean;
}

const ModuleButton = ({ builderElement, disabled }: ModuleButtonProps) => {
  const { label, icon: Icon } = builderElement.buttonComponent;
  const draggable = useDraggable({
    id: `module-btn-${builderElement.type}`,
    data: {
      type: builderElement.type,
      isModuleButton: true,
    },
  });
  return (
    <Button
      disabled={disabled}
      ref={draggable.setNodeRef}
      variant="muted"
      className={cn(
        'transition duration-150 aspect-square border-2 w-[126px] h-[126px] shadow-sm rounded-xl flex flex-col items-center justify-center gap-3 hover:border-ring hover:shadow-lg cursor-grab',
        draggable.isDragging && 'border-ring'
      )}
      {...draggable.attributes}
      {...draggable.listeners}
      key={label}
    >
      <Icon className="h-8 w-8" />
      <p className="text-sm font-medium">{label}</p>
    </Button>
  );
};

export const ModuleButtonOverlay = ({ builderElement }: ModuleButtonProps) => {
  const { label, icon: Icon } = builderElement.buttonComponent;
  return (
    <Button
      variant="outline"
      className={cn(
        'transition duration-150 aspect-square border-2 w-[126px] h-[126px] shadow-sm rounded-xl flex flex-col items-center justify-center gap-2 hover:border-ring hover:shadow-lg cursor-grab'
      )}
    >
      <Icon className="h-8 w-8" />
      <p className="text-sm font-medium">{label}</p>
    </Button>
  );
};

export default ModuleButton;
