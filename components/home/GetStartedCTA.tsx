import Container from '../shared/Container';
import { Button } from '../ui/button';

const GetStartedCTA = () => {
  return (
    <section id="getstatedcta">
      <Container className="text-center py-16">
        <h2 className="text-3xl lg:text-5xl tracking-[-0.04em] font-extrabold">
          Pre-production <br className="md:hidden" />
          re-imagined. <br />
          Create a Lancie board today.
        </h2>
        <Button variant="primary" size="mega" className="mt-8">
          Start Project - It&apos;s free
        </Button>
      </Container>
    </section>
  );
};

export default GetStartedCTA;
