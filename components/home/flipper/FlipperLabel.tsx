import { cn } from '@/lib/utils';
import React from 'react';

const FlipperLabel = ({
  children,
  fromColor,
  toColor,
}: {
  children: React.ReactNode;
  fromColor: string;
  toColor: string;
}) => {
  return (
    <span
      className={cn(
        'uppercase font-semibold tracking-wider'
        // `from-[${fromColor}] to-[${toColor}]`
      )}
      style={{
        background: `linear-gradient(${fromColor}, ${toColor})`,
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
};

export default FlipperLabel;
