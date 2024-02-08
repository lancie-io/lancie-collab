'use client';
import { createContext, useContext, useState } from 'react';

type LoadingContextT = {
  sentence: string;
  setSentence: (sentence: string) => void;
};

const LoadingContext = createContext<LoadingContextT>({
  sentence: '',
  setSentence: () => '',
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [sentence, setSentence] = useState('');
  return (
    <LoadingContext.Provider
      value={{
        sentence,
        setSentence,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
