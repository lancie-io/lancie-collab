import { useLiveblocks } from '@/lib/liveblocks';
import { VideosCustomInstance } from './VideosBuilderElement';
import { TVideoItem } from './types';

export function useVideoGallery() {
  const { updateElement } = useLiveblocks();

  const addVideo = ({
    element,
    video,
  }: {
    element: VideosCustomInstance;
    video: TVideoItem;
  }) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        videos: [video, ...element.extraAttributes.videos],
      },
    });
  };

  const removeVideo = ({
    element,
    videoId,
  }: {
    element: VideosCustomInstance;
    videoId: string;
  }) => {
    const videos = element.extraAttributes.videos.filter(
      (v: TVideoItem) => v.id !== videoId
    );
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        videos,
      },
    });
  };
  return { addVideo, removeVideo };
}
