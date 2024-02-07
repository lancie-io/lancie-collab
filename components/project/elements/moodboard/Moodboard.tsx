import OptimizedImage from '@/components/shared/OptimizedImage';
import UploadProvider, {
  UploadedFile,
} from '@/components/shared/upload/UploadProvider';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import useBuilder from '../../hooks/useBuilder';
import ElementBar from '../shared/ElementBar';
import EmptyState from '../shared/EmptyState';
import EmbedImageButton from './EmbedImageButton';
import { MoodboardElement, TImage } from './MoodboardBuilderElement';
import UnsplashButton from './UnsplashButton';
import UploadButton from './UploadButton';

interface MoodboardProps {
  element: MoodboardElement;
  isPreview: boolean;
}

const Moodboard = ({ element, isPreview }: MoodboardProps) => {
  const { images } = element.extraAttributes;
  const { updateElement } = useBuilder();

  function addImage(file: UploadedFile) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: [{ url: file.url }, ...element.extraAttributes.images],
      },
    });
    toast.success('Image added');
  }

  function removeImage(url: string) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        images: [
          ...element.extraAttributes.images.filter(
            (image: TImage) => image.url !== url
          ),
        ],
      },
    });
  }

  return (
    <div className="aspect-[2/1] overflow-hidden w-full flex flex-col">
      {!isPreview && (
        <ElementBar>
          <EmbedImageButton element={element} />
          <UnsplashButton element={element} />
          <UploadProvider onFileChange={addImage}>
            <UploadButton element={element} />
          </UploadProvider>
        </ElementBar>
      )}
      <div className="grow overflow-scroll flex flex-col no-scrollbar">
        {/* <pre>{JSON.stringify(element, null, 2)}</pre> */}
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
      </div>
    </div>
  );
};

export default Moodboard;
