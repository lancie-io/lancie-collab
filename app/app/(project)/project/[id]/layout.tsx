import BuilderContextProvider from '@/components/project/BuilderContext';
import React from 'react';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return <BuilderContextProvider>{children}</BuilderContextProvider>;
};

export default BuilderLayout;
