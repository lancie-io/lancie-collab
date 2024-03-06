import Container from '../shared/Container';
import { Icons } from '../shared/Icons';
import MegaCTA from './MegaCTA';

const GetStartedCTA = () => {
  return (
    <section id="getstatedcta">
      <Container className="text-center pb-16 md:pb-32 space-y-4 md:space-y-8">
        <Icons.logoText className="w-[100px] md:w-[140px] mx-auto opacity-75" />
        <h2 className="text-2xl lg:text-5xl tracking-[-0.04em] font-extrabold">
          Pre-production <br className="md:hidden" />
          re-imagined. <br className="hidden md:inline" />
          Create a Lancie board today.
        </h2>
        <MegaCTA id="get-started" />
      </Container>
    </section>
  );
};

export default GetStartedCTA;
