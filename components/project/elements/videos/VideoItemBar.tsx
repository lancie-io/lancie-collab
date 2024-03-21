import { useView } from '@/components/providers/ViewProvider';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import VideoNotesButton from './VideoNotesButton';
import { VideosCustomInstance } from './VideosBuilderElement';
import { useVideoGallery } from './functions';

interface VideoNotesProps {
  element: VideosCustomInstance;
  videoId: string;
}

const VideoItemBar = ({ element, videoId }: VideoNotesProps) => {
  const { removeVideo } = useVideoGallery();
  const handleRemove = () => {
    removeVideo({ element, videoId });
  };
  const { isView } = useView();
  return (
    <div className="bg-muted flex justify-between items-center group border-b">
      <VideoNotesButton videoId={videoId} />
      {!isView && (
        <Button
          onClick={handleRemove}
          variant="silent"
          size="iconSmall"
          className="transition duration-100 opacity-0 group-hover:opacity-100 text-muted-foreground"
        >
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default VideoItemBar;
