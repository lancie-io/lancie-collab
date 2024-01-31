import Flipper from '@/components/home/Flipper';
import GetStartedCTA from '@/components/home/GetStartedCTA';
import Hero from '@/components/home/Hero';
import ProminentText from '@/components/home/ProminentText';
import { flippers } from '@/lib/content';

export default function Home() {
  return (
    <div className="py-8 md:py-24 flex flex-col gap-16 md:gap-32">
      <Hero />
      <ProminentText />
      {flippers.map((flipper, idx) => (
        <Flipper key={idx} data={flipper} flip={idx % 2 === 0} />
      ))}
      <GetStartedCTA />
    </div>
  );
}
