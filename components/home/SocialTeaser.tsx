import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import { Testimonial, testimonialData } from './SocialProof';

const SocialTeaser = () => {
  return (
    <section id="socialteaser" className="-mb-0 md:-mb-16">
      <Container className="flex flex-col gap-6 md:gap-16 items-center">
        <Title mega className="text-xl shrink-0 text-muted-foreground">
          Trusted by top creators
        </Title>
        <div className="grid grid-cols-2 gap-3 md:gap-0 md:flex md:justify-center w-full px-0 md:px-0">
          <CreatorItem
            className="md:-translate-y-1/4 md:rotate-2"
            testimonial={testimonialData[0]}
          />
          <CreatorItem
            className="md:-ml-12 md:translate-y-1/4 md:-rotate-3"
            testimonial={testimonialData[1]}
          />
          <CreatorItem
            className="md:-ml-12 md:-translate-y-1/4 md:rotate-1"
            testimonial={testimonialData[2]}
          />
          <CreatorItem
            className="md:-ml-12 md:translate-y-1/4 md:-rotate-6"
            testimonial={testimonialData[3]}
          />
        </div>
      </Container>
    </section>
  );
};

export default SocialTeaser;

interface CreatorItemProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonial: Testimonial;
}

const CreatorItem = ({
  testimonial,
  className,
  ...props
}: CreatorItemProps) => {
  const { name, username, image, followers } = testimonial;
  return (
    <div
      className={cn(
        'border rounded-full flex gap-2 md:gap-3 lg:gap-4 pr-4 lg:pr-6 items-center overflow-hidden justify-between',
        className
      )}
      {...props}
    >
      <div className="relative aspect-square w-12 sm:w-14 lg:w-16 xl:w-20 rounded-full overflow-hidden shrink-0">
        <Image src={image} fill alt="avatar" />
      </div>
      <div className="mr-auto">
        <h3 className="font-medium whitespace-nowrap text-xs md:text-sm">
          {name}
        </h3>
        <h4 className="text-muted-foreground text-2xs md:text-sm">
          {username}
        </h4>
      </div>
      <div
        className="relative w-6 lg:w-8 aspect-square grid place-items-center rounded-md lg:rounded-lg ml-1 md:ml-2 lg:ml-4 shrink-0"
        style={{
          background:
            'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
        }}
      >
        <div className="bg-ring/25 backdrop-blur-sm text-background text-2xs md:text-sm rounded-md px-2 py-0.5 -translate-x-3/4 -translate-y-2/3 absolute">
          <p className="font-medium bg-clip-text text-white">11k</p>
        </div>
        <Instagram className="w-4 h-4 lg:w-6 md:h-6" />
      </div>
    </div>
  );
};
