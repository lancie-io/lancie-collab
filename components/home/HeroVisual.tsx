import { cn } from '@/lib/utils';
import colors from '@/resolveConfig';
import { MousePointer2, icons } from 'lucide-react';
import Image from 'next/image';
import LucideIcon from '../shared/LucideIcon';

type HeroData = {
  title: string;
  modules: { icon: keyof typeof icons; label: string }[];
  users: { name: string; image: string; color: string }[];
  comments: {
    emojis: { symbol: string; amount: number }[];
    timeAgo: string;
    body: React.ReactNode;
  }[];
};

const data: HeroData = {
  title: 'Endless Summer - Ad',
  modules: [
    {
      icon: 'Map',
      label: 'Locations',
    },
    {
      icon: 'Image',
      label: 'Moodboard',
    },
    {
      icon: 'Video',
      label: 'Media',
    },
    {
      icon: 'Pen',
      label: 'Script',
    },
  ],
  users: [
    {
      name: 'Tariq',
      image: '/user-tariq.jpg',
      color: colors['indigo-500'],
    },
    {
      name: 'Theo',
      image: '/user-beats.jpg',
      color: colors['fuchsia-500'],
    },
    {
      name: 'Lilly',
      image: '/user-blonde-girl.jpg',
      color: colors['rose-500'],
    },
  ],
  comments: [
    {
      emojis: [{ symbol: '🤝', amount: 1 }],
      timeAgo: '2m ago',
      body: (
        <>
          Great choice of locations! I&apos;ll make sure to get the filming
          permits in time.
        </>
      ),
    },
    {
      emojis: [
        { symbol: '🔥', amount: 3 },
        {
          symbol: '✅',
          amount: 1,
        },
      ],
      timeAgo: 'now',
      body: (
        <>
          <span className="bg-blue-500/20 text-blue-500 px-1 rounded-sm">
            @Luke
          </span>{' '}
          Could you please add Tom to the project? He&apos;ll be the first AC!
        </>
      ),
    },
  ],
};

const HeroVisual = () => {
  const { title, users, comments, modules } = data;
  return (
    <div className="w-full md:w-3/4 max-w-[1500px] relative">
      <div className="flex justify-between md:hidden -mb-5">
        <div className="flex">
          <ModuleBtn
            className="-translate-y-4 rotate-12"
            icon={modules[0].icon}
            label={modules[0].label}
          />
          <ModuleBtn
            className="-rotate-3"
            icon={modules[1].icon}
            label={modules[1].label}
          />
        </div>
        <div className="flex">
          <ModuleBtn
            className="rotate-3"
            icon={modules[2].icon}
            label={modules[2].label}
          />
          <ModuleBtn
            className="-translate-y-4 -rotate-12"
            icon={modules[3].icon}
            label={modules[3].label}
          />
        </div>
      </div>
      <div className="relative h-8 md:h-12 bg-background rounded-t-lg md:rounded-t-xl overflow-hidden flex items-center px-3 md:px-4 border-t-[1.5px] border-r-[1.5px] border-l-[1.5px] shadow-[0_0_40px_30px_rgba(22,23,24,0.9)]">
        <div className="flex gap-1 md:gap-1.5 opacity-50">
          <div className="w-2 md:w-2.5 aspect-square bg-[#EA635A] rounded-full" />
          <div className="w-2 md:w-2.5 aspect-square bg-[#F4BE59] rounded-full" />
          <div className="w-2 md:w-2.5 aspect-square bg-[#65C35A] rounded-full" />
        </div>
        {/* <h2 className="ml-4 md:ml-6 font-medium text-xs md:text-sm">{title}</h2> */}
        <div className="relative flex gap-1.5 ml-auto">
          <PulseCircle className="z-20 -mr-4 border-amber-500 pulsate-infinite-amber">
            <Image
              src={users[0].image}
              alt="Lancie User 1"
              fill
              className="rounded-full border-2 border-background"
            />
          </PulseCircle>
          <PulseCircle className="z-10 -mr-4 border-cyan-500 pulsate-infinite-cyan">
            <Image
              src={users[1].image}
              alt="Lancie User 1"
              fill
              className="rounded-full border-2 border-background"
            />
          </PulseCircle>
          <PulseCircle className=" -mr-2 border-violet-500 pulsate-infinite-violet">
            <Image
              src={users[2].image}
              alt="Lancie User 1"
              fill
              className="rounded-full border-2 border-background"
            />
          </PulseCircle>
        </div>
      </div>
      <div className="aspect-[5/4] md:aspect-video relative">
        <div className="relative w-full h-full bg-subtle border-[1.5px] rounded-b-lg md:rounded-b-xl overflow-hidden">
          <div className="h-full w-full md:w-3/4 mx-auto relative">
            <Image
              src="/lancie_hero_animation_thumbnail.jpg"
              alt="Screenshot of the Lancie video platform"
              fill
              objectFit="cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'bottom center',
              }}
              sizes="(max-width: 768px) 400px, 1600px"
            />
          </div>
          <div className="absolute w-full top-0 h-48 bg-gradient-to-t from-transparent to-subtle" />
          <div className="absolute w-full bottom-0 h-48 bg-gradient-to-b from-transparent to-subtle" />
        </div>
        <div className="hidden md:block shadow-xl absolute left-0 -bottom-8 -translate-x-1/2">
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-background" />
          <div className="space-y-2 lg:space-y-3 border bg-background p-2 rounded-lg">
            <ModuleBtn icon={modules[0].icon} label={modules[0].label} />
            <ModuleBtn icon={modules[1].icon} label={modules[1].label} />
            <ModuleBtn icon={modules[2].icon} label={modules[2].label} />
            <ModuleBtn icon={modules[3].icon} label={modules[3].label} />
          </div>
        </div>
        <div className="w-full md:w-[200px] lg:w-[240px] -mt-16 md:mt-0 relative md:absolute bottom-0 md:bottom-auto md:right-0 md:translate-x-1/2 flex flex-row md:flex-col gap-3 lg:gap-4 md:top-8 -left-[30px] md:left-auto">
          <Comment
            image={users[1].image}
            name={users[1].name}
            timeAgo={comments[0].timeAgo}
            emojis={comments[0].emojis}
            className="animate animate-fade-in-down animate-delay-1200"
          >
            {comments[0].body}
          </Comment>
          <Comment
            image={users[2].image}
            name={users[2].name}
            timeAgo={comments[1].timeAgo}
            emojis={comments[1].emojis}
            className="animate animate-fade-in-down animate-delay-1500"
          >
            {comments[1].body}
          </Comment>
        </div>
        <MousePointer2 className="absolute top-[40%] md:top-[55%] left-[55%] fill-foreground stroke-foreground w-10 md:w-12 h-10 md:h-12" />
      </div>
    </div>
  );
};

export default HeroVisual;

const PulseCircle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        'relative rounded-full w-4 md:w-8 aspect-square border md:border-[1.5px]',
        className
      )}
    >
      {children}
    </div>
  );
};

const ModuleBtn = ({
  icon,
  label,
  className,
}: {
  icon: keyof typeof icons;
  label: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'aspect-square border overflow-hidden rounded-md bg-gradient-to-b from-accent to-muted flex flex-col items-center justify-center font-medium text-center gap-1.5 w-20 lg:w-28',
        className
      )}
    >
      <LucideIcon name={icon} className="w-5 h-5 lg:w-7 lg:h-7" />
      <p className="text-xs lg:text-sm">{label}</p>
    </div>
  );
};

const Comment = ({
  image,
  name,
  timeAgo,
  children,
  emojis,
  className,
}: any) => {
  return (
    <div
      className={cn(
        'shadow-2xl bg-muted rounded-md border p-3 lg:p-4',
        className
      )}
    >
      <div className="flex mb-0.5 items-center">
        <Image
          src={image}
          alt="Lancie User 1"
          width={26}
          height={26}
          className="rounded-full mr-1.5 w-[20px] lg:w-[26px]"
        />
        <span className="mr-1 font-medium text-xs lg:text-sm">{name}</span>
        <span className="text-muted-foreground text-2xs lg:text-xs">
          {timeAgo}
        </span>
      </div>
      <div className="ml-[26px] lg:ml-[32px]">
        <p className="text-foreground/90 text-xs lg:text-sm">{children}</p>
        <div className="flex mt-1 lg:mt-2">
          {emojis.map(
            (emoji: { symbol: string; amount: number }, index: number) => (
              <div
                key={index}
                className="border rounded-full inline-flex gap-1 text-muted-foreground text-2xs lg:text-xs px-2 py-1"
              >
                <span>{emoji.symbol}</span>
                <span>{emoji.amount}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
