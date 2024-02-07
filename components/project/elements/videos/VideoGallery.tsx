'use client';
import Editor from '@/components/shared/editor';
import { Button, buttonVariants } from '@/components/ui/button';
import { JSONContent } from '@tiptap/react';
import {
  ExternalLink,
  FileVideo,
  Instagram,
  Trash,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { BuilderElementInstance } from '../../BuilderElements';
import useBuilder from '../../hooks/useBuilder';
import EmptyState from '../shared/EmptyState';
import VideoToolbar, { TVideoItem } from './VideoToolbar';

const VideoGallery = ({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) => {
  return (
    <div>
      <VideoToolbar elementInstance={elementInstance} />
      <div className="p-4 flex gap-4 overflow-scroll no-scrollbar">
        {elementInstance.extraAttributes?.videos?.length === 0 ? (
          <EmptyState
            icon="Film"
            title="Add Videos"
            description="With references its easier to align on story and style."
          />
        ) : (
          elementInstance.extraAttributes?.videos?.map((video: TVideoItem) => (
            <VideoItem video={video} key={video.id} element={elementInstance} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoGallery;

interface VideoItemProps {
  video: TVideoItem;
  element: BuilderElementInstance;
}

const VideoItem = ({ video, element }: VideoItemProps) => {
  const { updateElement } = useBuilder();

  const [videoUnsupported, setVideoUnsupported] = useState(false);

  function deleteVideoItem() {
    const videos = element.extraAttributes.videos.filter(
      (v: TVideoItem) => v.id !== video.id
    );
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        videos,
      },
    });
  }

  function updateVideoNotes(notes: JSONContent) {
    const videos = element.extraAttributes.videos.map((v: TVideoItem) => {
      if (v.id === video.id) {
        return { ...v, notes };
      }
      return v;
    });
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        videos,
      },
    });
  }

  //determine video platform based on url

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

  return (
    <div className="grid grid-cols-12 rounded-md overflow-hidden border bg-muted w-[280px] md:w-[340px] lg:w-[400px] shrink-0">
      <div className="relative aspect-video w-full overflow-hidden col-span-12 grid place-items-center">
        {videoUnsupported && (
          <div className="flex flex-col gap-4 items-center">
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
        {!videoUnsupported && (
          <ReactPlayer
            onError={(e) => setVideoUnsupported(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            width="100%"
            height="100%"
            url={video.url}
            controls={true}
          />
        )}
      </div>
      <div className="col-span-12 border-t relative group min-h-[200px] max-h-[300px]">
        <div className="w-full h-full overflow-scroll no-scrollbar">
          <Editor
            onUpdate={updateVideoNotes}
            content={video.notes}
            placeholder="Take notes about the video..."
          />
        </div>
        <Button
          onClick={deleteVideoItem}
          variant="ghost"
          size="iconSmall"
          className="transition duration-100 opacity-0 group-hover:opacity-100 absolute bottom-2 right-2"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
