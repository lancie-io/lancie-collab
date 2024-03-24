import Upload from '@/components/fileupload/Upload';
import { useView } from '@/components/providers/ViewProvider';
import { cn } from '@/lib/utils';
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
  const { isView } = useView();
  return (
    <Upload
      onUpload={addImage}
      options={{
        type: 'multi',
        maxFiles: 20,
      }}
    >
      <div
        className={cn(
          'overflow-hidden flex flex-col',
          !isView && 'aspect-[4/3]'
        )}
      >
        <ElementBar>
          <UnsplashButton element={element} />
          <UploadButton element={element} />
        </ElementBar>
        <PhotosGrid element={element} />
      </div>
    </Upload>
  );
};

export default Moodboard;
