'use client';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import AnimatedCursor from './AnimatedCursor';

const AnimatedCursorShowHandler = () => {
  const [showCustomCursor] = useLocalStorage('show-custom-cursor');

  if (!showCustomCursor) {
    return null;
  }
  return <AnimatedCursor />;
};

export default AnimatedCursorShowHandler;
