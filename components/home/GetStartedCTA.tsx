import Container from '../shared/Container';
import { Button } from '../ui/button';

const GetStartedCTA = () => {
  return (
    <section id="getstatedcta">
      <Container className="text-center">
        <h2 className="text-3xl lg:text-5xl tracking-[-0.04em] font-extrabold">
          Video production re-imagined. <br />
          Available today
        </h2>
        <Button variant="primary" className="h-16 px-12 text-xl mt-8">
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default GetStartedCTA;
