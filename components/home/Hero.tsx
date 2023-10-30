import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import GoToAppButton from '../shared/GoToAppButton';
import { Icons } from '../shared/Icons';
import Title from '../shared/Title';

const Hero = () => {
  return (
    <section>
      <Container className="flex flex-col items-center gap-4">
        <Title as="h1" className="text-4xl lg:text-7xl text-center">
          The fastest path to production
        </Title>
        <p className="text-lg text-center max-w-[800px]">
          <Balancer>
            Going from 0 to 1 in video production shouldn’t take forever.
            Kickstart your next project with Lancie, the collaboration tool that
            helps you align better, faster and more transparently with your
            client.
          </Balancer>
        </p>
        <GoToAppButton>
          <Icons.logoRaw className="w-5 h-5" />
          Create Project Now
        </GoToAppButton>
      </Container>
    </section>
  );
};

export default Hero;
