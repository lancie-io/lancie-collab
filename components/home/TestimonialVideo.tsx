'use client';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const TestimonialVideo = () => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const handlePlaying = () => {
    setPlaying((playing) => !playing);
  };
  useEffect(() => {
    if (!isInView) setPlaying(false);
  }, [isInView]);
  return (
    <div
      ref={ref}
      className="cursor-pointer aspect-[5/5] relative border rounded-xl overflow-hidden shadow-[0_0_40px_0px_rgba(0,0,0,0.3)]"
      onClick={handlePlaying}
    >
      <ReactPlayer
        url={'/maik_testimonial.mp4'}
        playing={playing}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        width="100%"
        height="100%"
        playsinline
      />
      <div
        className={cn(
          'absolute left-0 top-0 w-full h-full grid place-items-center bg-background/50 transition duration-200',
          playing && 'opacity-0'
        )}
      >
        <Play className="w-20 md:w-24 h-20 md:h-24" />
      </div>
    </div>
  );
};

export default TestimonialVideo;
