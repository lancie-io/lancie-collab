import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateThread, useThreads } from '@/liveblocks.config';
import {
  Composer,
  ComposerSubmitComment,
  Thread,
} from '@liveblocks/react-comments';
import { MessageSquare, MessageSquarePlus } from 'lucide-react';
import { FormEvent, useCallback } from 'react';
import { BuilderElementInstance } from '../../BuilderElements';

interface CommentButtonProps {
  element: BuilderElementInstance;
}

const CommentButton = ({ element }: CommentButtonProps) => {
  const { threads } = useThreads();
  const filteredThreads = threads.filter(
    (thread) => thread.metadata.id === element.id && !thread.metadata.resolved
  );
  const createThread = useCreateThread();

  const handleSubmit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      createThread({
        body,
        metadata: {
          type: 'module',
          id: element.id,
          resolved: false,
        },
      });
    },
    []
  );
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="h-8 px-2">
          {filteredThreads.length > 0 ? (
            <MessageSquare className="w-4 h-4" />
          ) : (
            <MessageSquarePlus className="w-4 h-4" />
          )}
          {filteredThreads.length > 0 && (
            <span className="text-xs">{filteredThreads.length}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        {filteredThreads.length < 1 && (
          <Composer onComposerSubmit={handleSubmit} className="border-none" />
        )}
        {filteredThreads.map((thread) => {
          return (
            <Thread thread={thread} key={thread.id} className="border-none" />
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default CommentButton;
