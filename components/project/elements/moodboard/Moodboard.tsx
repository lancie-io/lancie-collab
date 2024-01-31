import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Link, Trash, Upload } from 'lucide-react';
import useBuilder from '../../hooks/useBuilder';
import ElementBar from '../shared/ElementBar';
import EmptyState from '../shared/EmptyState';
import EmbedImagePopover from './EmbedImagePopover';
import { MoodboardElement, TImage } from './MoodboardBuilderElement';
import UnsplashButton from './UnsplashButton';

interface MoodboardProps {
  element: MoodboardElement;
  isPreview: boolean;
}

const Moodboard = ({ element, isPreview }: MoodboardProps) => {
  const { images } = element.extraAttributes;
  const { updateElement } = useBuilder();

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
    <div className="aspect-[2/1] overflow-hidden group w-full flex flex-col">
      {!isPreview && (
        <ElementBar>
          <EmbedImagePopover element={element}>
            <Button size="s" variant="outline">
              <Link className="w-3 h-3" />
              Embed
            </Button>
          </EmbedImagePopover>
          <UnsplashButton element={element} />
          <Button size="s" variant="outline" disabled>
            <Upload className="w-3 h-3" />
            Upload
          </Button>
        </ElementBar>
      )}
      <div className="grow overflow-scroll flex no-scrollbar">
        {/* <pre>{JSON.stringify(element, null, 2)}</pre> */}
        {images.length == 0 && (
          <EmptyState
            className="w-full h-full "
            icon="Image"
            title="Add Images"
            description="Define mood and visual style of your project."
          />
        )}

        {images.length > 0 &&
          images.map((image: TImage, idx: number) => (
            <div key={idx} className="grid grid-cols-3 gap-4 p-4 items-start">
              <div
                className="relative rounded-md overflow-hidden group"
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Moodboard;
