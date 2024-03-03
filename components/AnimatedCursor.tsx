'use client';
import { cn } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState('');

  // Update mouse position on mouse move
  const updateMousePosition = (e: any) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleClick = () => {
    const cursor = document.getElementById('animated-cursor');
    if (cursor) {
      cursor.classList.add('animated-click');
      setTimeout(() => {
        cursor.classList.remove('animated-click');
      }, 200);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('click', handleClick);
    document.body.classList.add('no-cursor');

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.body.classList.remove('no-cursor');
    };
  }, []);

  const ref = useRef<HTMLElement>(null);

  return (
    <MousePointer2
      className={cn(
        'transition duration-200 ease-in-out w-12 h-12 fill-foreground stroke-foreground pointer-events-none z-[10000] origin-[30%_30%]'
      )}
      id="animated-cursor"
      style={{
        position: 'fixed',
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    />
  );
};

export default AnimatedCursor;
