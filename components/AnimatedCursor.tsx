'use client';
import { cn } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState('');

  // Update mouse position on mouse move
  const updateMousePosition = (e: any) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <MousePointer2
      className={cn(
        'w-12 h-12 fill-primary/50 stroke-primary scale-100',
        cursorSize === 'small' && 'scale-75'
      )}
      style={{ position: 'fixed', left: mousePosition.x, top: mousePosition.y }}
    />
  );
};

export default AnimatedCursor;
