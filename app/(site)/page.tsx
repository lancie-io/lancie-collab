import Flipper from '@/components/home/Flipper';
import Hero from '@/components/home/Hero';
import Visual from '@/components/home/Visual';
import { flippers } from '@/lib/content';

export default function Home() {
  return (
    <div className="py-8 md:py-24 flex flex-col gap-16 md:gap-32">
      <Hero />
      <Visual />
      {flippers.map((flipper, idx) => (
        <Flipper key={idx} data={flipper} flip={idx % 2 === 0} />
      ))}
    </div>
  );
}
