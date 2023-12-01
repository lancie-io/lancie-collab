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
  moveElementUp: (id: string) => void;
  moveElementDown: (id: string) => void;
  moveElementFirst: (id: string) => void;
  moveElementLast: (id: string) => void;
  isFirst: (id: string) => boolean;
  isLast: (id: string) => boolean;
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

  const moveElementUp = (id: string) => {
    setElements((prev) => {
      const next = [...prev];
      const index = next.findIndex((e) => e.id === id);
      const element = next[index];
      next.splice(index, 1);
      next.splice(index - 1, 0, element);
      return next;
    });
  };

  const moveElementDown = (id: string) => {
    setElements((prev) => {
      const next = [...prev];
      const index = next.findIndex((e) => e.id === id);
      const element = next[index];
      next.splice(index, 1);
      next.splice(index + 1, 0, element);
      return next;
    });
  };

  const moveElementFirst = (id: string) => {
    setElements((prev) => {
      const next = [...prev];
      const index = next.findIndex((e) => e.id === id);
      const element = next[index];
      next.splice(index, 1);
      next.unshift(element);
      return next;
    });
  };

  const moveElementLast = (id: string) => {
    setElements((prev) => {
      const next = [...prev];
      const index = next.findIndex((e) => e.id === id);
      const element = next[index];
      next.splice(index, 1);
      next.push(element);
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

  const isFirst = (id: string) => {
    return elements[0].id === id;
  };

  const isLast = (id: string) => {
    return elements[elements.length - 1].id === id;
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
        moveElementUp,
        moveElementDown,
        moveElementFirst,
        moveElementLast,
        isFirst,
        isLast,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
