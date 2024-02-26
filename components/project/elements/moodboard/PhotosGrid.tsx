import CircleProgress from '@/components/fileupload/CircleProgress';
import { useUpload } from '@/components/fileupload/Upload';
import { UploadTrigger } from '@/components/fileupload/UploadTrigger';
import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';
import MoodboardImage from './MoodboardImage';
import { useMoodboard } from './useMoodboard';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableMoodboardImage from './SortableMoodboardImage';

const PhotosGrid = ({ element }: { element: MoodboardCustomInstance }) => {
  const { removeImage, moveImage } = useMoodboard(element);
  const hasImages = element.extraAttributes.images.length > 0;
  const { uploadingItems } = useUpload();
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(
    pointerSensor,
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const [activeImage, setActiveImage] = useState<TImage | null>(null);

  function rendered() {
    //Render complete
    // alert('image rendered');
  }

  function startRender() {
    //Rendering start
    requestAnimationFrame(rendered);
  }

  function loaded() {
    requestAnimationFrame(startRender);
  }

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveImage(event.active.data.current!.image);
      console.log('Drag Started:', element.extraAttributes.images);
    },
    [element]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const newIndex = element.extraAttributes.images.findIndex(
          (image) => image.id === over!.id
        );
        moveImage(String(active.id), newIndex);
      }
      console.log('Drag Ended:', event);

      setActiveImage(null);
    },
    [element]
  );
  const handleDragCancel = useCallback(() => {
    setActiveImage(null);
  }, [element]);

  if (!hasImages && !uploadingItems.length) {
    return (
      <div className="p-3 h-full">
        <UploadTrigger />
      </div>
    );
  }

  if (hasImages || uploadingItems.length) {
    return (
      <div className="grow flex flex-col overflow-hidden rounded-b-md relative">
        <div className="grow overflow-scroll">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={element.extraAttributes.images}
              strategy={rectSortingStrategy}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 768: 2, 960: 3 }}
                className="p-3"
              >
                <Masonry gutter="12px">
                  {uploadingItems.map((item) => {
                    const isLoading = typeof item.progress === 'number';
                    return (
                      <div
                        key={item.key}
                        className={cn(
                          'relative border rounded-md overflow-hidden bg-accent'
                        )}
                      >
                        <img src={item.url} alt="" className="opacity-25" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
                          {isLoading && (
                            // <p className="absolute text-sm font-medium">
                            //   {item.progress}%
                            // </p>
                            <CircleProgress
                              progress={item.progress as number}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {element.extraAttributes.images.map((image: TImage) => {
                    return (
                      <SortableMoodboardImage
                        element={element}
                        key={image.id}
                        image={image}
                      />
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </SortableContext>
            <DragOverlay style={{ transformOrigin: '0 0 ' }}>
              {activeImage ? (
                <MoodboardImage
                  key={activeImage.id}
                  image={activeImage}
                  element={element}
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
        <div className="absolute left-0 w-full bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }
};

export default PhotosGrid;
