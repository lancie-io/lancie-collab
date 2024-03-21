'use client';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { trackEvent } from '../providers/Analytics';

const TestimonialVideo = () => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [progress, setProgress] = useState(0);

  const handlePlaying = () => {
    setPlaying((playing) => {
      if (playing) {
        trackEvent('TestimonialVideo Stopped', { progress });
      } else {
        trackEvent('TestimonialVideo Started');
      }
      return !playing;
    });
  };
  useEffect(() => {
    if (!isInView) {
      if (playing) {
        setPlaying(false);
        trackEvent('TestimonialVideo Stopped', { progress });
      }
    }
  }, [isInView]);
  useEffect(() => {
    const cleanup = () => {
      // do your cleanup
      if (playing) {
        setPlaying(false);
        trackEvent('TestimonialVideo Stopped', { progress });
      }
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  });

  return (
    <div
      ref={ref}
      className="cursor-pointer aspect-[5/5] relative border rounded-xl overflow-hidden shadow-[0_0_40px_0px_rgba(0,0,0,0.3)]"
      onClick={handlePlaying}
    >
      <ReactPlayer
        url={'/maik_testimonial.mp4'}
        playing={playing}
        onProgress={(state) =>
          setProgress(Number((state.played * 100).toFixed(2)))
        }
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
        config={{
          file: {
            attributes: {
              poster:
                'https://res.cloudinary.com/dum2lqmke/image/fetch/q_60/f_auto/dpr_2/c_scale,w_600/https://res.cloudinary.com/du3mz9iny/image/upload/v1709769274/testimonial-maik-thumbnail_xwyusw.jpg',
            },
          },
        }}
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
