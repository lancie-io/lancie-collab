'use client';

import {
  BuilderElement,
  BuilderElements,
  ElementType,
} from '@/components/project/BuilderElements';
import useBuilder from '@/components/project/hooks/useBuilder';
import { idGenerator } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import ModuleButtonBase from './ModuleButtonBase';

interface ModuleButtonProps {
  builderElement: BuilderElement;
  disabled?: boolean;
}

const ModuleButton = ({ builderElement, disabled }: ModuleButtonProps) => {
  const { label, icon } = builderElement.buttonComponent;
  const draggable = useDraggable({
    id: `module-btn-${builderElement.type}`,
    data: {
      type: builderElement.type,
      isModuleButton: true,
    },
  });

  const { addElement } = useBuilder();

  const type = builderElement.type as ElementType;

  const handleAdd = () => {
    const newElement = BuilderElements[type as ElementType].construct(
      idGenerator()
    );
    addElement(0, newElement);
  };
  return (
    <>
      <ModuleButtonBase
        disabled={disabled}
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
