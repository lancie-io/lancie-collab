'use client';
import { useLocalStorage } from '@uidotdev/usehooks';
import AnimatedCursor from './AnimatedCursor';

const AnimatedCursorShowHandler = () => {
  const [isCustomCursor] = useLocalStorage('custom-cursor');

  if (!isCustomCursor) {
    return null;
  }
  return <AnimatedCursor />;
};

export default AnimatedCursorShowHandler;
