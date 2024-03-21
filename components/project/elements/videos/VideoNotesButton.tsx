import { useView } from '@/components/providers/ViewProvider';
import LiveEditor from '@/components/shared/editor/LiveEditor';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ClipboardPen } from 'lucide-react';

const VideoNotesButton = ({ videoId }: { videoId: string }) => {
  const { isView } = useView();
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" className="border-r rounded-none" size="sm">
          <ClipboardPen className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="relative h-[300px]">
          <div className="w-full h-full overflow-scroll no-scrollbar">
            <LiveEditor
              id={videoId}
              placeholder="Take notes about this video..."
              editable={!isView}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VideoNotesButton;
