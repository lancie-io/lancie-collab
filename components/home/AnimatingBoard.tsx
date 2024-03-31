'use client';
import { cn } from '@/lib/utils';
import imageThumb1 from '@/public/felix.jpg';
import imageMap1 from '@/public/new-york.png';
import image1 from '@/public/orange-glasses-girl.jpg';
import imageL1 from '@/public/thomas.png';
import {
  GripHorizontal,
  MessageSquare,
  MousePointer2,
  Plus,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { motion } from 'framer-motion';

const AnimateContext = createContext<{
  step: number;
}>({
  step: 0,
});

// Context provider component
export const AnimateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 2);
    }, 2000);
    return () => clearInterval(interval);
  });
  return (
    <AnimateContext.Provider value={{ step }}>
      {children}
    </AnimateContext.Provider>
  );
};

// Custom hook to use the refs
export const useAnimate = () => useContext(AnimateContext);

const AnimatingBoard = () => {
  return (
    <AnimateProvider>
      <div className="relative h-full overflow-hidden">
        <div className="overflow-scroll h-full">
          <div className="space-y-3">
            <Module type="moodboard" title="Moodboard" />
            <Module type="locations" title="Locations" />
            <Module type="table" title="Call Sheet" />
            <Module type="videos" title="Reference Videos" />
            <Module type="richtext" title="Overview" />
          </div>
        </div>
      </div>
    </AnimateProvider>
  );
};

const CursorArea = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
      <Cursor className="absolute" />
    </div>
  );
};

export default AnimatingBoard;

const Module = ({ type, title }: { type: string; title: string }) => {
  return (
    <div className="border rounded-md bg-background">
      <div className="px-2 h-10 flex items-center border-b relative">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-4 rounded-md bg-primary" />
          <div className="text-sm font-medium">{title}</div>
        </div>
        <GripHorizontal className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
        <MessageSquare className="ml-auto w-4 h-4" />
      </div>
      <Content type={type} />
    </div>
  );
};

const Content = ({ type }: { type: string }) => {
  if (type === 'moodboard') {
    return <Moodboard />;
  }
  if (type === 'table') {
    return <StaticTable />;
  }
  if (type === 'locations') {
    return <Locations />;
  }
  if (type === 'videos') {
    return <Videos />;
  }
  if (type === 'richtext') {
    return <RichText />;
  }
};

const Cursor = ({ className, ...props }: { className?: string }) => {
  return (
    <motion.div
      className={cn(
        'fill-fuchsia-500 stroke-fuchsia-500 relative flex items-end',
        className
      )}
      id="cursor"
      key="cursor"
      {...props}
      layoutId="cursor"
      layout="position"
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
    >
      <MousePointer2
        className={cn('fill-fuchsia-500 stroke-fuchsia-500 w-10 h-10')}
      />
      <div className="-ml-3 -mb-3 rounded-lg px-1.5 py-0.5 bg-fuchsia-500 text-foreground font-medium text-sm">
        Lukas
      </div>
    </motion.div>
  );
};

const Summary = () => {
  return (
    <div className="p-3 grid grid-cols-2">
      <Image src={image1} className="aspect-video" alt="" />
      <div>
        <h4>Endless Summer Ad</h4>
        <div></div>
      </div>
    </div>
  );
};

const Moodboard = () => {
  const images = [image1, image1, image1, image1, image1, image1];
  const { step } = useAnimate();
  return (
    <div
      className="grid grid-cols-3 gap-3 p-3 aspect-video overflow-hidden"
      id="animate-image"
    >
      <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative">
        <Upload />
        <p className="text-muted-foreground">Upload image</p>
        {step === 0 && <Cursor className="absolute" />}
      </div>
      {images.map((image, idx) => (
        <Image key={idx} src={image} alt="" className="rounded-lg" />
      ))}
    </div>
  );
};

const RichText = () => {
  return (
    <div className="p-3">
      <h4 className="font-semibold text-xl">Agenda</h4>
      <ul>
        <li>Shoot lower east-side</li>
        <li>Shoot brooklyn</li>
      </ul>
    </div>
  );
};

const Locations = () => {
  const locations = [
    {
      title: 'Hamburg',
      subtitle: 'Banausenweg 12',
      map: imageMap1,
      notes: 'My notes...',
      gallery: [imageL1, imageL1, imageL1],
    },
    {
      title: 'Englischer Garten',
      subtitle: 'Viktualienweg 39',
      map: imageMap1,
      notes: 'My notes...',
      gallery: [imageL1, imageL1, imageL1],
    },
  ];
  const { step } = useAnimate();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 p-3 border-r space-y-3">
        <div className="relative">
          <Input value="Search location..." id="animate-input" />
          {step === 1 && <Cursor className="absolute left-4 top-4" />}
        </div>

        <div className="space-y-2">
          {locations.map((location, idx) => (
            <div className="rounded-lg border bg-muted py-2 px-3" key={idx}>
              <h4 className="text-sm font-medium">{location.title}</h4>
              <p className="text-muted-foreground text-xs">
                {location.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-8 p-3 space-y-3">
        <h4 className="font-semibold text-2xl">{locations[0].title}</h4>
        <div className="flex gap-1.5">
          {locations[0].gallery.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              alt=""
              className="aspect-square object-cover w-[20%] rounded-lg"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted aspect-[5/4] border rounded-lg p-3">
            {locations[0].notes}
          </div>
          <div className="bg-muted aspect-[5/4] relative border rounded-lg overflow-hidden">
            <Image
              src={locations[0].map}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Videos = () => {
  const videos = [
    {
      thumbnail: imageThumb1,
    },
    {
      thumbnail: imageThumb1,
    },
  ];
  return (
    <div className="flex gap-1.5 p-3">
      {videos.map((video, idx) => (
        <div key={idx}>
          <Image
            src={video.thumbnail}
            alt=""
            className="aspect-video rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
};

const StaticTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Emily</TableCell>
          <TableCell>
            <div className="rounded-full px-2.5 py-0.5 inline-flex items-center bg-indigo-500/40">
              Director
            </div>
          </TableCell>
          <TableCell>123-456-789</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam</TableCell>
          <TableCell>
            <div className="rounded-full px-2.5 py-0.5 inline-flex items-center bg-purple-500/40">
              Cinematographer
            </div>
          </TableCell>
          <TableCell>123-456-789</TableCell>
        </TableRow>
        <TableRow>
          <div className="pl-3 h-8 flex items-center relative">
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </TableRow>
      </TableBody>
    </Table>
  );
};
