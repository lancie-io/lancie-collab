import { useLiveblocks } from '@/lib/liveblocks';
import { BuilderElementInstance } from '../../BuilderElements';

export function useDataTable(element: BuilderElementInstance) {
  const { updateElement } = useLiveblocks();

  function updateTable(data: any[]) {
    const updatedElement = {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        state: {
          ...element.extraAttributes.state,
          data,
        },
      },
    };
    updateElement(element.id, updatedElement);
  }

  return { updateTable };
}
