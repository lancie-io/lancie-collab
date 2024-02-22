import { buttonVariants } from '@/components/ui/button';
import { isValidUrl } from '@/lib/utils';
import { ExternalLink, FileVideo, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import VideoItemBar from './VideoItemBar';
import { VideosCustomInstance } from './VideosBuilderElement';
import { TVideoItem } from './types';

interface VideoItemProps {
  video: TVideoItem;
  element: VideosCustomInstance;
}

const VideoItem = ({ video, element }: VideoItemProps) => {
  const [videoUnsupported, setVideoUnsupported] = useState(false);

  function getSocialPlatform(url: string): string | undefined {
    if (!isValidUrl(url)) {
      return;
    }
    let platform:
      | 'instagram'
      | 'youtube'
      | 'vimeo'
      | 'tiktok'
      | 'twitter'
      | 'linkedin'
      | 'unknown' = 'unknown';
    if (url.includes('youtube') || url.includes('youtu.be')) {
      platform = 'youtube';
    }
    if (url.includes('instagram')) {
      platform = 'instagram';
    }
    if (url.includes('tiktok')) {
      platform = 'tiktok';
    }
    return platform;
  }

  const renderIcon = () => {
    if (video.url.includes('youtube') || video.url.includes('youtu.be')) {
      return <Youtube className="w-12 h-12" />;
    }
    if (video.url.includes('vimeo')) {
      return <Youtube className="w-12 h-12" />;
    }
    if (video.url.includes('instagram')) {
      return <Instagram className="w-12 h-12" />;
    }
    return <FileVideo className="w-12 h-12" />;
  };

  const platform = getSocialPlatform(video.url);

  return (
    <div className="relative rounded-md overflow-hidden border bg-muted w-[325px] shrink-0">
      <VideoItemBar videoId={video.id} element={element} />
      {platform == 'instagram' && !videoUnsupported && (
        <InstagramEmbed
          url={video.url}
          className="w-full"
          onError={(e) => setVideoUnsupported(true)}
        />
      )}
      {(platform == 'youtube' ||
        platform == 'vimeo' ||
        platform == 'unknown') &&
        !videoUnsupported && (
          <div className="w-full overflow-hidden relative">
            <ReactPlayer
              onError={(e) => setVideoUnsupported(true)}
              width="100%"
              height="auto"
              url={video.url}
              controls={true}
            />
          </div>
        )}
      {platform == 'tiktok' && !videoUnsupported && (
        <TikTokEmbed
          url={video.url}
          onError={(e) => setVideoUnsupported(true)}
        />
      )}
      {videoUnsupported && (
        <div className="relative aspect-video w-full overflow-hidden flex flex-col items-center gap-4">
          {renderIcon()}
          <Link
            href={video.url}
            target="_blank"
            className={buttonVariants({ variant: 'secondary', size: 'sm' })}
          >
            <ExternalLink className="w-4 h-4" />
            Watch
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
