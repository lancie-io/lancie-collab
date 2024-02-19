import { useMutation, useStorage } from '@/liveblocks.config';

export function useLiveblocks() {
  const elements = useStorage((root) => root.elements);

  const addElement = useMutation(({ storage }, index, element) => {
    const mutableElements = storage.get('elements');
    mutableElements.insert(element, index);
  }, []);

  const removeElement = useMutation(({ storage }, id) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.delete(index);
  }, []);

  const moveElementUp = useMutation(({ storage }, id) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.move(index, Math.max(0, index - 1));
  }, []);

  const moveElementDown = useMutation(({ storage }, id) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.move(
      index,
      Math.min(mutableElements.length - 1, index + 1)
    );
  }, []);

  const moveElementFirst = useMutation(({ storage }, id) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.move(index, 0);
  }, []);

  const moveElementLast = useMutation(({ storage }, id) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.move(index, mutableElements.length - 1);
  }, []);

  const updateElement = useMutation(({ storage }, id, element) => {
    const mutableElements = storage.get('elements');
    const index = mutableElements.findIndex((e) => e.id === id);
    mutableElements.set(index, element);
  }, []);

  const isFirst = (id: string) => {
    const elements = useStorage((root) => root.elements);
    return elements[0].id === id;
  };

  const isLast = (id: string) => {
    const elements = useStorage((root) => root.elements);
    return elements[elements.length - 1].id === id;
  };
  return {
    elements,
    addElement,
    removeElement,
    moveElementUp,
    moveElementDown,
    moveElementFirst,
    moveElementLast,
    updateElement,
    isFirst,
    isLast,
  };
}
