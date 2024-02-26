import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { CSSProperties, forwardRef } from 'react';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';
import { useMoodboard } from './useMoodboard';

export interface MoodboardImageProps {
  image: TImage;
  element: MoodboardCustomInstance;
  isDragging?: boolean;
  withOpacity?: boolean;
  style?: CSSProperties;
}

const MoodboardImage = forwardRef<HTMLDivElement, MoodboardImageProps>(
  ({ image, element, isDragging, style, withOpacity, ...props }, ref) => {
    const { removeImage } = useMoodboard(element);

    return (
      <div
        className={cn(
          'relative border rounded-md overflow-hidden w-full bg-accent group cursor-grab',
          withOpacity && 'opacity-10',
          isDragging && 'cursor-grabbing'
        )}
        key={image!.id}
        ref={ref}
        style={style}
        {...props}
      >
        <OptimizedImage src={image!.url} steps={[300]} />
        {!isDragging && (
          <Button
            onClick={() => removeImage(image!.id)}
            variant="ghost"
            size="iconSmall"
            className="transition duration-100 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }
);

MoodboardImage.displayName = 'MoodboardImage';

export default MoodboardImage;
