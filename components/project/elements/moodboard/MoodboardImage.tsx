import { useView } from '@/components/providers/ViewProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import { CSSProperties, forwardRef } from 'react';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';
import { useMoodboard } from './useMoodboard';

export interface MoodboardImageProps {
  image: TImage;
  element: MoodboardCustomInstance;
  isDragging?: boolean;
  withOpacity?: boolean;
  layoutId?: string;
  style?: CSSProperties;
}

const MoodboardImage = forwardRef<HTMLDivElement, MoodboardImageProps>(
  (
    { image, element, isDragging, style, withOpacity, layoutId, ...props },
    ref
  ) => {
    const { removeImage } = useMoodboard(element);
    const { isView } = useView();
    return (
      <motion.div
        className={cn(
          'relative border rounded-md overflow-hidden w-full bg-accent group cursor-grab',
          isDragging && 'cursor-grabbing'
        )}
        key={image!.id}
        ref={ref}
        style={style}
        layoutId={layoutId}
        {...props}
      >
        <img src={image!.url} />
        {!isDragging && !isView && (
          <Button
            onClick={() => removeImage(image!.id)}
            variant="ghost"
            size="iconSmall"
            className="transition duration-100 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
        {/* {image.user && (
          <span className="absolute left-2 bottom-1 opacity-0 group-hover:opacity-100 text-sm">
            Photo by{' '}
            <a
              className="underline"
              href={`https://unsplash.com/@${image.user?.username}?utm_source=lancie_name&utm_medium=referral`}
              target="_blank"
            >
              {image.user?.name}
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/?utm_source=lancie&utm_medium=referral"
              className="underline"
            >
              Unsplash
            </a>
          </span>
        )} */}
      </motion.div>
    );
  }
);

MoodboardImage.displayName = 'MoodboardImage';

export default MoodboardImage;
