import Container from '../shared/Container';
import Title from '../shared/Title';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section>
      <Container className="flex flex-col items-center">
        <Title as="h1" className="text-3xl lg:text-6xl">
          The fastest path to production
        </Title>
        <p>Lorem ipsum</p>
        <Button>Create Project</Button>
      </Container>
    </section>
  );
};

export default Hero;
