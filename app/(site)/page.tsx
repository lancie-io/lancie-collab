import DetailsOverview from '@/components/home/DetailsOverview';
import Flipper from '@/components/home/Flipper';
import GetStartedCTA from '@/components/home/GetStartedCTA';
import Hero from '@/components/home/Hero';
import ProductScreens from '@/components/home/ProductScreens';
import ProminentText from '@/components/home/ProminentText';
import SocialTeaser from '@/components/home/SocialTeaser';
import Testimonial from '@/components/home/Testimonial';
import { flippers } from '@/lib/flippercontent';

export default function Home() {
  return (
    <div className="py-12 md:py-20 flex flex-col gap-28 md:gap-56 overflow-hidden bg-[radial-gradient(50%_10%_at_50%_0%,rgba(255,77,20,0.1)_0%,rgba(255,77,20,0)_100%)]">
      <Hero />
      <ProminentText />
      <SocialTeaser />
      <div className="space-y-16 md:space-y-40">
        {flippers.map((flipper, idx) => (
          <Flipper key={idx} data={flipper} flip={idx % 2 !== 0} />
        ))}
      </div>
      <Testimonial />
      {/* <SocialProof /> */}

      <ProductScreens />
      <DetailsOverview />
      <GetStartedCTA />
    </div>
  );
}
