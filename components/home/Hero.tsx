import Container from '../shared/Container';
import GoToAppButton from '../shared/GoToAppButton';
import { Icons } from '../shared/Icons';
import Title from '../shared/Title';

const Hero = () => {
  return (
    <section>
      <Container className="flex flex-col items-center gap-4">
        <Title as="h1" className="text-3xl lg:text-6xl">
          The fastest path to production
        </Title>
        <p>Lorem ipsum</p>
        <GoToAppButton>
          <Icons.logoRaw className="w-5 h-5" />
          Create Project Now
        </GoToAppButton>
      </Container>
    </section>
  );
};

export default Hero;
