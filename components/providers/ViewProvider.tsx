'use client';
import { useAuthUser } from '@/lib/auth';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type View = 'edit' | 'view';

type ViewContextType = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  isView: boolean;
  isEdit: boolean;
} | null;

const ViewContext = createContext<ViewContextType>(null);

const ViewProvider = ({
  initialView,
  children,
}: {
  initialView: View;
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<View>(initialView);
  const [isView, setIsView] = useState(initialView === 'view');
  const user = useAuthUser();
  useEffect(() => {
    setIsView(view === 'view');
  }, [view]);

  const value = {
    view,
    setView,
    isView: view === 'view',
    isEdit: view === 'edit',
  };
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export default ViewProvider;

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context!;
};
