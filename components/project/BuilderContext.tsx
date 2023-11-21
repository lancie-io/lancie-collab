'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { BuilderElementInstance } from './BuilderElements';

type BuilderContextType = {
  elements: BuilderElementInstance[];
  setElements: Dispatch<SetStateAction<BuilderElementInstance[]>>;
  addElement: (index: number, element: BuilderElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: BuilderElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<BuilderElementInstance | null>>;
  updateElement: (id: string, element: BuilderElementInstance) => void;
};

export const BuilderContext = React.createContext<BuilderContextType | null>(
  null
);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = React.useState<BuilderElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    React.useState<BuilderElementInstance | null>(null);

  const addElement = (index: number, element: BuilderElementInstance) => {
    setElements((prev) => {
      const next = [...prev];
      next.splice(index, 0, element);
      return next;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => {
      const next = [...prev];
      const index = next.findIndex((e) => e.id === id);
      next.splice(index, 1);
      return next;
    });
  };

  const updateElement = (id: string, element: BuilderElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((e) => e.id === id);
      newElements[index] = element;
      return newElements;
    });
  };
  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
