import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';

export type Testimonial = {
  name: string;
  username: string;
  image: string;
  text: string;
  followers: number;
};

export const testimonialData: Testimonial[] = [
  {
    name: 'Jens/Jan',
    username: '@dscvr.twins',
    image: '/creator-twins.jpg',
    text: 'Those pre-built modules unlock a new superpower!',
    followers: 35,
  },
  {
    name: 'Maik',
    username: '@maik.hns',
    image: '/creator-maik.jpg',
    text: 'Those pre-built modules unlock a new superpower!',
    followers: 46,
  },
  {
    name: 'Julie',
    username: '@julievalentina',
    image: '/creator-juliane.jpg',
    text: 'Those pre-built modules unlock a new superpower!',
    followers: 36,
  },
  {
    name: 'Mats',
    username: '@matsmitzett',
    image: '/mats.png',
    text: 'Those pre-built modules unlock a new superpower!',
    followers: 11,
  },
];

const SocialProof = () => {
  return (
    <section id="socialproof">
      <Container className="flex flex-col items-center gap-12">
        <div>
          <p className="text-muted-foreground font-medium uppercase text-center tracking-wider">
            By creators for creators. <br />
          </p>
          <Title
            as="h2"
            className="text-4xl md:text-5xl tracking-[-0.04em] font-extrabold"
          >
            And they{' '}
            <span className="bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">
              love it.
            </span>
          </Title>
        </div>
        <div className="flex gap-6">
          {testimonialData.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SocialProof;

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, username, image, text } = testimonial;
  return (
    <div className="border rounded-xl p-6 space-y-4">
      <p className="text-lg">
        <span className="absolute text-2xl -translate-x-[120%] -translate-y-[15%]">
          &#x201C;
        </span>
        {text}
        <span className="text-2xl absolute -translate-y-[10%] translate-x-[20%]">
          &#x201E;
        </span>
      </p>
      <div className="flex justify-between items-end">
        <div className="flex gap-2 items-center">
          <div className="relative aspect-square w-12 rounded-full overflow-hidden">
            <Image src={image} fill alt="avatar" />
          </div>
          <div className="text-xs md:text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground">{username}</p>
          </div>
        </div>
        <div
          className="relative w-7 aspect-square grid place-items-center rounded-md"
          style={{
            background:
              'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
          }}
        >
          <div className="bg-white/25 backdrop-blur-xl text-background text-2xs rounded-md px-1.5 py-0.5 -translate-x-3/4 -translate-y-3/4 absolute">
            <p className="font-medium bg-clip-text text-white">11k</p>
          </div>
          <Instagram className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
