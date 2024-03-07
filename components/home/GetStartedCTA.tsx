import Container from '../shared/Container';
import { Icons } from '../shared/Icons';
import Title from '../shared/Title';
import MegaCTA from './MegaCTA';

const GetStartedCTA = () => {
  return (
    <section id="getstatedcta">
      <Container className="text-center pb-16 md:pb-32 space-y-4 md:space-y-8">
        <Icons.logoText className="w-[100px] md:w-[140px] mx-auto opacity-75" />
        <Title
          mega
          as="h2"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl "
        >
          Pre-production <br className="md:hidden" />
          re-imagined. <br className="hidden md:inline" />
          Create a Lancie board today.
        </Title>
        <MegaCTA id="get-started" />
      </Container>
    </section>
  );
};

export default GetStartedCTA;
