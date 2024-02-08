'use client';
import { saveProject } from '@/lib/actions';
import { useBroadcastEvent, useEventListener } from '@/liveblocks.config';
import { Prisma } from '@prisma/client';
import { debounce, isEqual } from 'lodash';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BuilderElementInstance } from './BuilderElements';

const debouncedSave = debounce(saveProject, 1000);

export type TProject = Pick<
  Prisma.ProjectGetPayload<{}>,
  'id' | 'published' | 'name' | 'userId'
>;

type BuilderContextT = {
  elements: BuilderElementInstance[];
  setElements: Dispatch<SetStateAction<BuilderElementInstance[]>>;
  addElement: (index: number, element: BuilderElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: BuilderElementInstance) => void;
  moveElementUp: (id: string) => void;
  moveElementDown: (id: string) => void;
  moveElementFirst: (id: string) => void;
  moveElementLast: (id: string) => void;
  isFirst: (id: string) => boolean;
  isLast: (id: string) => boolean;
};
export const BuilderContext = createContext<BuilderContextT | null>(null);

const BuilderProvider = ({
  children,
  elementsFromServer,
  projectId,
}: {
  children: React.ReactNode;
  elementsFromServer: Prisma.ProjectGetPayload<{}>['content'];
  projectId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const parsedElementsFromServer = elementsFromServer
    ? JSON.parse(elementsFromServer as string)
    : [];
  const [elements, setElements] = useState<BuilderElementInstance[]>([
    ...parsedElementsFromServer,
  ]);

  const broadcast = useBroadcastEvent();
  useEffect(() => {
    // Fetch additional data or perform any other initialization here
    setLoading(false);
    debouncedSave(projectId, JSON.stringify(elements));
    broadcast({ type: 'elements', data: elements });

    return () => {
      debouncedSave.cancel();
    };
  }, [elements]);

  useEventListener(({ event, user, connectionId }: any) => {
    //                       ^^^^ Will be Client A
    // Do something
    const newElements = event.data;
    if (!isEqual(elements, newElements)) {
      setElements(newElements);
    }
  });

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

  // if (loading) {
  //   // You might want to return a loading state or skeleton component here
  //   return <div>Loading project...</div>;
  // }

  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
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
};

export default BuilderProvider;

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
