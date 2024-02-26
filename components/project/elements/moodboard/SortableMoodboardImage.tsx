import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';
import MoodboardImage, { MoodboardImageProps } from './MoodboardImage';

const SortableMoodboardImage: FC<MoodboardImageProps> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.image.id,
    data: { image: props.image },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  return (
    <MoodboardImage
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableMoodboardImage;
