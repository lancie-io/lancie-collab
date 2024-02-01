import DetailsOverview from '@/components/home/DetailsOverview';
import FeatureCollaborate from '@/components/home/FeatureCollaborate';
import FeatureCreate from '@/components/home/FeatureCreate';
import FeaturePublish from '@/components/home/FeaturePublish';
import GetStartedCTA from '@/components/home/GetStartedCTA';
import Hero from '@/components/home/Hero';
import ProductScreens from '@/components/home/ProductScreens';
import ProminentText from '@/components/home/ProminentText';
import SocialProof from '@/components/home/SocialProof';

export default function Home() {
  return (
    <div className="py-12 md:py-24 flex flex-col gap-24 md:gap-48 overflow-hidden bg-[radial-gradient(50%_10%_at_50%_0%,rgba(255,77,20,0.1)_0%,rgba(255,77,20,0)_100%)]">
      <Hero />
      <ProminentText />
      <SocialProof />
      <div className="space-y-24 md:space-y-56">
        <FeatureCreate />
        <FeaturePublish />
        <FeatureCollaborate />
      </div>
      {/* {flippers.map((flipper, idx) => (
        <Flipper key={idx} data={flipper} flip={idx % 2 === 0} />
      ))} */}

      <ProductScreens />
      <DetailsOverview />
      <GetStartedCTA />
    </div>
  );
}
