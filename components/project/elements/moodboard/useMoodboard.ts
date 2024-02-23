import { UploadedFile } from '@/components/fileupload/types';
import { useLiveblocks } from '@/lib/liveblocks';
import { idGenerator } from '@/lib/utils';
import { useRef } from 'react';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';

export function useMoodboard(element: MoodboardCustomInstance) {
  const { updateElement } = useLiveblocks();
  const elementRef = useRef(element);
  elementRef.current = element;

  function addImage(image: UploadedFile) {
    const updatedElement = {
      ...elementRef.current,
      extraAttributes: {
        ...elementRef.current.extraAttributes,
        images: [
          { url: image.url, id: idGenerator() },
          ...elementRef.current.extraAttributes.images,
        ],
      },
    };
    updateElement(element.id, updatedElement);
  }

  function removeImage(id: string) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: [
          ...element.extraAttributes.images.filter(
            (image: TImage) => image.id !== id
          ),
        ],
      },
    });
  }
  return { addImage, removeImage };
}
