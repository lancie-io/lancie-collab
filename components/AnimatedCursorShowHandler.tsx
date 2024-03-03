'use client';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import AnimatedCursor from './AnimatedCursor';

const AnimatedCursorShowHandler = () => {
  const [isCustomCursor] = useLocalStorage('custom-cursor');

  if (!isCustomCursor) {
    return null;
  }
  return <AnimatedCursor />;
};

export default AnimatedCursorShowHandler;
