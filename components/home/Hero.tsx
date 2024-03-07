import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import Title from '../shared/Title';
import CreatorAvatars from './CreatorAvatars';
import HeroCTA from './HeroCTA';
import HeroVisual from './HeroVisual';

const Hero = () => {
  return (
    <section id="hero" className="">
      <Container className="flex flex-col items-center gap-10 md:gap-12">
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <Title
            as="h1"
            className="animate animate-fade-in-down text-center tracking-[-0.04em] font-extrabold leading-[1.1] bg-white bg-gradient-to-b from-white to-ring/50 bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            }}
          >
            Video <br className="md:hidden" />
            pre-production <br />
            made easy
          </Title>
          <p className="text-muted-foreground md:text-lg animate animate-fade-in-down animate-delay-200 text-center mb-1 md:mb-2">
            <Balancer>
              Create beautiful video concepts with clients and crew.{' '}
              <br className="hidden md:inline" />
              Lancie simplifies decision-making and brings visions to life.
            </Balancer>
          </p>
          <HeroCTA />
          <div className="pt-2 md:pt-2">
            <CreatorAvatars />
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
};

export default Hero;
