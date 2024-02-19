'use client';

import {
  BuilderElement,
  BuilderElements,
  ElementType,
} from '@/components/project/BuilderElements';
import { useLiveblocks } from '@/lib/liveblocks';
import { idGenerator } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import ModuleButtonBase from './ModuleButtonBase';

interface ModuleButtonProps {
  builderElement: BuilderElement;
  disabled?: boolean;
  single?: boolean;
}

const ModuleButton = ({
  builderElement,
  disabled,
  single,
}: ModuleButtonProps) => {
  const { label, icon } = builderElement.buttonComponent;
  const draggable = useDraggable({
    id: `module-btn-${builderElement.type}`,
    data: {
      type: builderElement.type,
      isModuleButton: true,
    },
  });

  const { elements, addElement } = useLiveblocks();

  const type = builderElement.type as ElementType;

  const isAlreadyInUse =
    elements.some((element) => element.type === builderElement.type) && single;

  const handleAdd = () => {
    const newElement = BuilderElements[type as ElementType].construct(
      idGenerator()
    );
    // addElement(0, newElement);
    addElement(0, newElement);
  };
  return (
    <>
      <ModuleButtonBase
        isAlreadyInUse={isAlreadyInUse}
        disabled={disabled || isAlreadyInUse}
        className={draggable.isDragging ? 'border-ring' : ''}
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        {...draggable.listeners}
        builderElement={builderElement}
        key={label}
        onClick={handleAdd}
      />
    </>
  );
};

export default ModuleButton;
