'use client';
import { useCreateThread, useThreads } from '@/liveblocks.config';
import {
  Comment,
  Composer,
  ComposerSubmitComment,
} from '@liveblocks/react-comments';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { BuilderElementInstance } from '../../BuilderElements';
import useBuilder from '../../hooks/useBuilder';
import VideoToolbar from './VideoToolbar';

const VideoGallery = ({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) => {
  const { elements } = useBuilder();
  return (
    <div>
      <VideoToolbar elementInstance={elementInstance} />
      <div className="p-4">
        {elementInstance.extraAttributes?.videos.map(
          (video: any, idx: number) => <VideoItem video={video} key={idx} />
        )}
      </div>
    </div>
  );
};

export default VideoGallery;

interface VideoItemProps {
  video: string;
}

const VideoItem = ({ video }: VideoItemProps) => {
  const { threads } = useThreads();
  const filteredThreads = threads.filter(
    (thread) => thread.metadata.id === video
  );
  const sortedThreads = useMemo(() => {
    return filteredThreads.sort((a, b) => {
      const aDate = new Date(a.comments[0].createdAt);
      const bDate = new Date(b.comments[0].createdAt);
      return bDate.getTime() - aDate.getTime();
    });
  }, [threads]);
  const createThread = useCreateThread();
  const handleSubmit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      createThread({
        body,
        metadata: {
          type: 'video-thread',
          id: video,
        },
      });
    },
    []
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-12 rounded-lg overflow-hidden border bg-background">
      <div className="p-4 col-span-7">
        <div className="relative aspect-video w-full overflow-hidden ">
          <ReactPlayer
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            width="100%"
            height="100%"
            url={video}
          />
        </div>
      </div>
      <div className="col-span-5 border-l aspect-square relative">
        <div className="absolute w-full h-full left-0 top-0 overflow-scroll p-4 gap-4 flex flex-col pb-12">
          <Composer
            className="bg-muted border rounded-md"
            onComposerSubmit={handleSubmit}
          />
          {sortedThreads.map((thread) => {
            return (
              <div className="border rounded-md" key={thread.id}>
                {thread.comments.map((comment) => (
                  <Comment
                    showActions={true}
                    showReactions={true}
                    key={comment.id}
                    comment={comment}
                    className="bg-muted"
                  />
                ))}
                <Composer className="bg-muted border-t" threadId={thread.id} />
              </div>
            );
          })}
        </div>
        <div className="w-full h-12 bg-gradient-to-t from-background to-transparent bottom-0 absolute left-0" />
      </div>
    </div>
  );
};

{
  /* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Button
                className="text-xs flex gap-1 px-2 py-1 h-auto"
                variant="ghost"
              >
                <Plus className="w-3 h-3" />
                Add Comment
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none">
              <Composer
                className="bg-muted/50 border rounded-lg"
                onComposerSubmit={handleSubmit}
              />
            </PopoverContent>
          </Popover>
          <Button size="iconXS" variant="ghost">
            <Expand className="w-3 h-3" />
          </Button> */
}
