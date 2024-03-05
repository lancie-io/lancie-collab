import Container from '../shared/Container';
import MegaCTA from './MegaCTA';

const GetStartedCTA = () => {
  return (
    <section id="getstatedcta">
      <Container className="text-center py-16 space-y-8">
        <h2 className="text-3xl lg:text-5xl tracking-[-0.04em] font-extrabold">
          Pre-production <br className="md:hidden" />
          re-imagined. <br />
          Create a Lancie board today.
        </h2>
        <MegaCTA id="get-started" />
      </Container>
    </section>
  );
};

export default GetStartedCTA;
