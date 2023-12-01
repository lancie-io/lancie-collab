'use client';

import { useCreateThread, useSelf, useThreads } from '@/liveblocks.config';
import {
  Comment,
  Composer,
  ComposerSubmitComment,
} from '@liveblocks/react-comments';
import { FormEvent, useCallback, useMemo } from 'react';

export function Conversation() {
  const { threads } = useThreads();
  const filteredThreads = threads.filter(
    (thread) => thread.metadata.type === 'conversation-thread'
  );
  const sortedThreads = useMemo(() => {
    return filteredThreads.sort((a, b) => {
      const aDate = new Date(a.comments[0].createdAt);
      const bDate = new Date(b.comments[0].createdAt);
      return bDate.getTime() - aDate.getTime();
    });
  }, [threads]);

  const self = useSelf((me) => me.info);
  const createThread = useCreateThread();

  const handleSubmit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      createThread({
        body,
        metadata: {
          type: 'conversation-thread',
        },
      });
    },
    []
  );

  return (
    <div className="w-[300px] p-3 border-l bg-background overflow-scroll no-scrollbar shrink-0">
      <div className="space-y-3">
        <Composer
          className="bg-muted border rounded-lg"
          onComposerSubmit={handleSubmit}
        />
        {sortedThreads.map((thread) => {
          return (
            <div className="border rounded-lg overflow-hidden" key={thread.id}>
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
    </div>
  );
}
