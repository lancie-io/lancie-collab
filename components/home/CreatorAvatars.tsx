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
    <div className="flex pb-1">
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
        width={32}
        height={32}
        alt={`Picture of ${creator.name}`}
      />
    </div>
  );
};
