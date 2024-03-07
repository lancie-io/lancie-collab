import { cn } from '@/lib/utils';
import Image from 'next/image';

type CreatorAvatarType = {
  name: string;
  image: string;
};

const data: CreatorAvatarType[] = [
  {
    name: 'DSCV Twins',
    image: '/creator-twins.jpg',
  },
  {
    name: 'Maik',
    image: '/creator-maik.jpg',
  },
  {
    name: 'Juliane',
    image: '/creator-juliane.jpg',
  },
];

const CreatorAvatars = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {data.map((creator, idx) => {
          return (
            <CreatorAvatar
              key={idx}
              idx={idx}
              creator={creator}
              className={idx !== data.length - 1 ? '-mr-2' : ''}
            />
          );
        })}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground">
        Loved by 300+ creators already
      </p>
    </div>
  );
};

export default CreatorAvatars;

const CreatorAvatar = ({
  creator,
  className,
  idx,
}: {
  creator: CreatorAvatarType;
  className?: string;
  idx: number;
}) => {
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden animate animate-fade-in-left',
        className
      )}
      style={{
        animationDelay: `${300 * (idx + 1)}ms`,
      }}
    >
      <Image
        src={creator.image}
        width={24}
        height={24}
        alt={`Picture of ${creator.name}`}
      />
    </div>
  );
};
