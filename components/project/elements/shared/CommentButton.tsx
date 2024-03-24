import { useProjectId } from '@/components/providers/ProjectProvider';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthUser } from '@/lib/auth';
import { useCreateThread, useThreads } from '@/liveblocks.config';
import {
  Composer,
  ComposerSubmitComment,
  Thread,
} from '@liveblocks/react-comments';
import { MessageSquare, MessageSquarePlus } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
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
  const user = useAuthUser();
  const projectId = useProjectId();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    let iA = false;
    if (user) {
      iA = user.memberProjects.some((pId) => pId === projectId);
    }
    setIsAuthorized(iA);
  }, [user, projectId]);
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
      <PopoverContent className="p-0" id="popover-content">
        {!isAuthorized && (
          <div className="p-3">
            <p className="text-sm text-muted-foreground">
              {filteredThreads.length < 1 && <span>No comments yet. </span>}
              <span>
                Sign in and get added to the project to leave comments.
              </span>
            </p>
          </div>
        )}
        {filteredThreads.length < 1 && isAuthorized && (
          <Composer onComposerSubmit={handleSubmit} className="border-none" />
        )}
        {filteredThreads.map((thread) => {
          return (
            <Thread
              thread={thread}
              key={thread.id}
              className="border-none"
              showComposer={isAuthorized}
              showActions={isAuthorized}
            />
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default CommentButton;
