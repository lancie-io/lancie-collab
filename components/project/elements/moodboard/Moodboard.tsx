import { UploadedFile } from '@/components/shared/upload/UploadProvider';
import { Button } from '@/components/ui/button';
import { useLiveblocks } from '@/lib/liveblocks';
import { idGenerator } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import ElementBar from '../shared/ElementBar';
import { MoodboardElement, TImage } from './MoodboardBuilderElement';
import UnsplashButton from './UnsplashButton';

interface MoodboardProps {
  element: MoodboardElement;
  isPreview: boolean;
}

const Moodboard = ({ element, isPreview }: MoodboardProps) => {
  const { images } = element.extraAttributes;
  const { updateElement } = useLiveblocks();

  function addImage(file: UploadedFile) {
    console.log('added', file);
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: [
          { url: file.url, id: idGenerator() },
          ...element.extraAttributes.images,
        ],
      },
    });
    toast.success('Image added');
  }

  useEffect(() => {
    console.log('Moodboard element changed', element.extraAttributes.images);
  }, [element]);

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

  return (
    <div className="aspect-[3/2] overflow-hidden w-full flex flex-col">
      {!isPreview && (
        <ElementBar>
          <UnsplashButton element={element} />
          {/* <UploadProvider onFileChange={addImage}>
            <UploadButton element={element} />
          </UploadProvider> */}
        </ElementBar>
      )}

      <div className="grow overflow-scroll no-scrollbar grid grid-cols-2 p-4 gap-4 ">
        {/* <MultiImageDropzoneUsage
          onComplete={() => {}}
          onFileAdded={addImage}
          element={element}
        /> */}
        {images.map((image: TImage) => {
          return (
            <div
              className="relative border rounded-md overflow-hidden min-h-[200px] bg-accent group"
              key={image.id}
            >
              {/* <OptimizedImage  /> */}
              <img src={image.url} alt="" />
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
      </div>
      {/* <div className="grow overflow-scroll flex flex-col no-scrollbar">
        {images?.length == 0 && (
          <EmptyState
            className="w-full h-full "
            icon="Image"
            title="Add Images"
            description="Define mood and visual style of your project."
          />
        )}
        {images?.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-4 items-start grow">
            {images?.map((image: TImage, idx: number) => (
              <div
                className="relative rounded-md overflow-hidden group bg-red-500/25 min-h-[32px]"
                key={image.url}
              >
                {!isPreview && (
                  <Button
                    onClick={() => removeImage(image.url)}
                    variant="ghost"
                    size="iconSmall"
                    className="transition duration-100 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
                <OptimizedImage src={image.url} />
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Moodboard;
