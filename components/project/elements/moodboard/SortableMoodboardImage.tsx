import { useView } from '@/components/providers/ViewProvider';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';
import MoodboardImage, { MoodboardImageProps } from './MoodboardImage';

const SortableMoodboardImage: FC<MoodboardImageProps> = (props) => {
  const { isView } = useView();
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
    disabled: isView,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.1 : 1,
  };

  return (
    <MoodboardImage
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      layoutId={props.image.id}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableMoodboardImage;
