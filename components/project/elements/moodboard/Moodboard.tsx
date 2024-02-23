import Upload from '@/components/fileupload/Upload';
import { useEffect } from 'react';
import ElementBar from '../shared/ElementBar';
import { MoodboardCustomInstance } from './MoodboardBuilderElement';
import PhotosGrid from './PhotosGrid';
import UnsplashButton from './UnsplashButton';
import UploadButton from './UploadButton';
import { useMoodboard } from './useMoodboard';

interface MoodboardProps {
  element: MoodboardCustomInstance;
  isPreview: boolean;
}

const Moodboard = ({ element, isPreview }: MoodboardProps) => {
  const { addImage } = useMoodboard(element);
  useEffect(() => {
    console.log('Element Changed:', element);
  }, [element]);

  return (
    <Upload
      onUpload={addImage}
      options={{
        type: 'multi',
        maxFiles: 20,
      }}
    >
      <div className="aspect-[3/2] overflow-hidden flex flex-col">
        <ElementBar>
          <UnsplashButton element={element} />
          <UploadButton element={element} />
        </ElementBar>

        <PhotosGrid element={element} />

        {/* <div className="grow overflow-scroll flex flex-col no-scrollbar">
        {images?.length == 0 && (
          <EmptyState
            className="w-full h-full "
            icon="Image"
            title="Add Images"
            description="Define mood and visual style of your project."
          />
        )}
      </div> */}
      </div>
    </Upload>
  );
};

export default Moodboard;
