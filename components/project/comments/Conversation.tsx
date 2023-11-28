'use client';

import { useSelf, useThreads } from '@/liveblocks.config';
import { Comment, Composer } from '@liveblocks/react-comments';
import { useMemo } from 'react';

export function Conversation() {
  const { threads } = useThreads();
  const sortedThreads = useMemo(() => {
    return threads.sort((a, b) => {
      const aDate = new Date(a.comments[0].createdAt);
      const bDate = new Date(b.comments[0].createdAt);
      return bDate.getTime() - aDate.getTime();
    });
  }, [threads]);

  const self = useSelf((me) => me.info);

  return (
    <div className="w-[360px] p-4 border-l bg-background overflow-scroll">
      <div className="space-y-4">
        <Composer className="bg-muted/50 border rounded-lg" />
        {sortedThreads.map((thread) => {
          return (
            <div
              className="border border-muted rounded-lg overflow-hidden"
              key={thread.id}
            >
              {thread.comments.map((comment) => (
                <Comment
                  showActions={true}
                  showReactions={true}
                  key={comment.id}
                  comment={comment}
                  className="bg-muted/50"
                />
              ))}
              <Composer className="bg-muted/50 border-t" threadId={thread.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
