import Avatar from '@/components/shared/Avatar';
import { Prisma } from '@prisma/client';
import { formatRelative } from 'date-fns';

interface CommentProps {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8" data={comment.user} />
        <div>
          <div className="text-sm">{comment.user.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatRelative(new Date(comment.createdAt), new Date())}
          </div>
        </div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;
