'use client';

import { useContext } from 'react';
import { BuilderContext } from '../BuilderContext';

const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context)
    throw new Error('useBuilder must be used within a BuilderContextProvider');
  return context;
};

export default useBuilder;
