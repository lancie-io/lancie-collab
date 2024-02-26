'use client';

import { MessagesSquare } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useView } from '../providers/ViewProvider';
import { Button } from '../ui/button';

type CommentContextType = {
  isOpen: boolean;
  toggle: () => void;
} | null;

const CommentContext = createContext<CommentContextType>(null);

const CommentToggle = () => {
  const { isView } = useView();
  const { isOpen, toggle } = useComment();

  const handleToggle = () => {
    toggle();
  };
  if (!isView) {
    return null;
  }
  return (
    <Button
      size="iconSmall"
      className="hidden md:inline-flex"
      variant="outline"
      onClick={handleToggle}
    >
      <MessagesSquare className="w-4 h-4" />
    </Button>
  );
};

export default CommentToggle;

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isView } = useView();
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isView) {
      setIsOpen(false);
    }
  }, [isView]);
  const value = {
    isOpen,
    toggle,
  };
  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context!;
};
