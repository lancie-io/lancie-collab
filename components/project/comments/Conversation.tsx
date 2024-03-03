'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreateThread, useThreads } from '@/liveblocks.config';
import {
  Composer,
  ComposerSubmitComment,
  Thread,
} from '@liveblocks/react-comments';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FormEvent, useCallback, useMemo } from 'react';

interface ConversationProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Conversation({ className, ...props }: ConversationProps) {
  const { threads } = useThreads();
  const filteredThreads = threads.filter((thread) => !thread.metadata.resolved);
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
          type: 'general',
          resolved: false,
        },
      });
    },
    []
  );

  const handleThreadClick = (id?: string) => {
    if (!id) return;
    const element = document.getElementById(`module-${id}`);
    const outlineClass1 = 'outline-dashed';
    const outlineClass2 = 'outline-ring';
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add(outlineClass1);
      element.classList.add(outlineClass2);
      setTimeout(() => {
        element.classList.remove(outlineClass1);
        element.classList.remove(outlineClass2);
      }, 1500);
    }
  };

  return (
    <div
      className={cn(
        'w-full md:w-[300px] p-0 md:p-3 md:border-l bg-background overflow-scroll no-scrollbar shrink-0',
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        <Composer onComposerSubmit={handleSubmit} />
        <AnimatePresence>
          {sortedThreads.map((thread) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -40,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                  scale: 0.9,
                }}
                key={thread.id}
                layoutId={thread.id}
                layout="position"
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
              >
                <Thread
                  thread={thread}
                  key={thread.id}
                  onClick={() => handleThreadClick(thread.metadata.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const LoadingConversation = () => {
  return (
    <div
      className={cn(
        'w-full md:w-[300px] p-3 md:border-l bg-background overflow-scroll no-scrollbar shrink-0'
      )}
    >
      <div className="space-y-3">
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="aspect-video w-full" />
      </div>
    </div>
  );
};
