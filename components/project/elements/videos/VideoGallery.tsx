'use client';
import EmptyState from '../shared/EmptyState';
import VideoGalleryToolbar from './VideoGalleryToolbar';
import VideoItem from './VideoItem';
import { VideosCustomInstance } from './VideosBuilderElement';
import { TVideoItem } from './types';

const VideoGallery = ({ element }: { element: VideosCustomInstance }) => {
  const hasVideos = element.extraAttributes.videos.length > 0;
  const videos = element.extraAttributes.videos;
  return (
    <div>
      <VideoGalleryToolbar element={element} />
      {!hasVideos && (
        <EmptyState
          icon="Film"
          title="Add Videos"
          description="With references its easier to align on story and style."
        />
      )}
      {hasVideos && (
        <div className="p-3 md:p-4 flex items-start gap-3 md:gap-4 overflow-scroll no-scrollbar">
          {videos.map((video: TVideoItem) => (
            <VideoItem video={video} key={video.id} element={element} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
