'use client';
import ElementBar from '../shared/ElementBar';
import VideoAddButton from './VideoAddButton';
import { VideosCustomInstance } from './VideosBuilderElement';

const VideoGalleryToolbar = ({
  element,
}: {
  element: VideosCustomInstance;
}) => {
  return (
    <ElementBar>
      <VideoAddButton element={element} />
    </ElementBar>
  );
};

export default VideoGalleryToolbar;
