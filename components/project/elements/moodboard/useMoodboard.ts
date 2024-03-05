import { UploadedFile } from '@/components/fileupload/types';
import { useLiveblocks } from '@/lib/liveblocks';
import { idGenerator } from '@/lib/utils';
import { useRef } from 'react';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';
import { UnsplashPhoto } from './unsplash-action';

export function useMoodboard(element: MoodboardCustomInstance) {
  const { updateElement } = useLiveblocks();
  const elementRef = useRef(element);
  elementRef.current = element;

  const images = elementRef.current.extraAttributes.images;

  function addUnsplashImage(image: UnsplashPhoto) {
    const updatedElement = {
      ...elementRef.current,
      extraAttributes: {
        ...elementRef.current.extraAttributes,
        images: [
          {
            url: image.urls.small,
            user: {
              name: image.user.name,
              username: image.user.username,
            },
            id: idGenerator(),
          },
          ...elementRef.current.extraAttributes.images,
        ],
      },
    };
    updateElement(element.id, updatedElement);
  }

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

  function moveImage(id: string, newIndex: number) {
    const index = element.extraAttributes.images.findIndex(
      (image) => image.id === id
    );
    const newImages = [...element.extraAttributes.images];
    newImages.splice(index, 1);
    newImages.splice(newIndex, 0, element.extraAttributes.images[index]);
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: newImages,
      },
    });
  }
  return { addImage, addUnsplashImage, removeImage, moveImage };
}
