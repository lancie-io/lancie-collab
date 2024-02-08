'use client';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import Container from '../shared/Container';
import { Skeleton } from '../ui/skeleton';

const LoadingBuilder = () => {
  const chooseRandomSentence = useMemo(() => {
    const sentences = [
      'Capturing pixels, shaping stories...',
      'Crafting cinematic dreams, one frame at a time...',
      'Syncing creativity in the cloud...',
      'Polishing pixels for your visual masterpiece...',
      'Weaving footage into magic threads...',
      'Lighting up servers for reel brilliance...',
      'Storyboarding the future of your project...',
      'Syncing visionaries worldwide, in real-time...',
      'Directing data to its rightful frames...',
      'Building bridges between imagination and reality...',
      'Loading creativity, reel by reel...',
      'Rendering your vision into digital gold...',
      'Spinning up servers for cinematic wonders...',
      'Processing pixels for picture-perfect moments...',
      'Syncing scenes for seamless storytelling...',
      'Igniting inspiration in the digital darkroom...',
      'Crafting visual symphonies, frame by frame...',
      'Mixing magic into your media mix...',
      'Unlocking the door to your creative vault...',
      'Elevating your footage to blockbuster status...',
    ];
    return () => sentences[Math.floor(Math.random() * sentences.length)];
  }, []);

  return (
    <div
      key="loading"
      className="w-screen h-screen fixed left-0 top-0 grid place-items-center"
    >
      <Container className="flex justify-center">
        <div className="max-w-[800px] w-full space-y-2 md:space-y-4">
          <div className="w-full space-y-2">
            <Skeleton className="w-full h-8 md:h-12" />
          </div>
          <div className="grid grid-cols-9 w-full gap-2 md:gap-4">
            <div className="grid col-span-9 grid-cols-6 md:grid-cols-2 gap-2 md:col-span-2 items-start place-items-start content-start justify-start">
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="w-full aspect-square" />
            </div>

            <div className="col-span-9 md:col-span-5 space-y-2">
              <Skeleton className="w-full h-32 md:h-48" />
              <Skeleton className="w-full h-32 md:h-48" />
              <Skeleton className="w-full h-32 md:h-48 md:hidden" />
            </div>
            <div className="hidden md:block col-span-2 space-y-2">
              <Skeleton className="w-full h-16 aspect-square" />
              <Skeleton className="w-full h-16 aspect-square" />
              <Skeleton className="w-full h-16 aspect-square" />
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute flex flex-col items-center gap-4">
        <Loader2 className="animate-spin w-16 h-16 " />
        <h1 className="font-medium">{chooseRandomSentence()}</h1>
      </div>
    </div>
  );
};

export default LoadingBuilder;
