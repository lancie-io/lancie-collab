'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

interface CommentsSidebarProps {
  projectId: string;
}

type CommentsContextType = {
  comments: any[];
  addComment: any;
  setComments: any;
};

export const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  addComment: () => {},
  setComments: () => {},
});

export const CommentsProvider = ({
  initialComments,
  children,
}: {
  children: React.ReactNode;
  initialComments?: any[];
}) => {
  const [comments, setComments] = useState(initialComments || []);
  useEffect(() => {
    if (!initialComments) return;
    setComments(initialComments);
  }, [initialComments]);
  const addComment = (comment: any) => {
    setComments((prev) => [comment, ...prev]);
  };
  return (
    <CommentsContext.Provider value={{ comments, addComment, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

const CommentsSidebar = ({ projectId }: CommentsSidebarProps) => {
  const { comments } = useContext(CommentsContext);
  return (
    <div className="w-[300px] border-l shrink-0 p-6">
      <h2 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
        Comments
      </h2>
      <div className="space-y-4">
        <NewComment id={projectId} />
        {comments?.map((comment, idx) => {
          return <Comment key={idx} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentsSidebar;
