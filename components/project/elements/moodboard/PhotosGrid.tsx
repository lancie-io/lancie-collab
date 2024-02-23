import CircleProgress from '@/components/fileupload/CircleProgress';
import { useUpload } from '@/components/fileupload/Upload';
import { UploadTrigger } from '@/components/fileupload/UploadTrigger';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MoodboardCustomInstance, TImage } from './MoodboardBuilderElement';
import { useMoodboard } from './useMoodboard';

const PhotosGrid = ({ element }: { element: MoodboardCustomInstance }) => {
  const images = element.extraAttributes.images;
  const hasImages = images.length > 0;
  const { removeImage } = useMoodboard(element);
  const { uploadingItems } = useUpload();

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
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 768: 2, 960: 3 }}
            className="p-3"
          >
            <Masonry gutter="12px">
              {uploadingItems.map((item) => {
                const isLoading = typeof item.progress === 'number';
                return (
                  <div key={item.key} className={cn('relative aspect-square')}>
                    <img
                      src={item.url}
                      alt=""
                      className="opacity-25 w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
                      {isLoading && (
                        // <p className="absolute text-sm font-medium">
                        //   {item.progress}%
                        // </p>
                        <CircleProgress progress={item.progress as number} />
                      )}
                    </div>
                  </div>
                );
              })}
              {images.map((image: TImage) => {
                return (
                  <div
                    className="relative border rounded-md overflow-hidden w-full bg-accent group"
                    key={image.id}
                  >
                    <OptimizedImage
                      onLoad={() => loaded()}
                      src={image.url}
                      steps={[300]}
                    />
                    <Button
                      onClick={() => removeImage(image.id)}
                      variant="ghost"
                      size="iconSmall"
                      className="transition duration-100 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
        <div className="absolute left-0 w-full bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }
};

export default PhotosGrid;
