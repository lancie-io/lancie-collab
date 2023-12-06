import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateThread, useThreads } from '@/liveblocks.config';
import {
  Comment,
  Composer,
  ComposerSubmitComment,
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
    (thread) => thread.metadata.id === element.id
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
      <PopoverContent className="p-0 z-40">
        {filteredThreads.map((thread) => {
          return (
            <div key={thread.id} className="relative z-50">
              {thread.comments.map((comment) => (
                <Comment
                  showActions={true}
                  showReactions={true}
                  key={comment.id}
                  comment={comment}
                  className="bg-muted"
                />
              ))}
              <Composer
                className="border-t bg-muted relative z-50"
                threadId={thread.id}
              />
            </div>
          );
        })}
        {filteredThreads.length < 1 && (
          <Composer
            className="border-t bg-muted relative z-50"
            onComposerSubmit={handleSubmit}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CommentButton;
