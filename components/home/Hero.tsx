import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import HeroCTA from './HeroCTA';
import ModuleButtonReplica from './ModuleButtonReplica';

const Hero = () => {
  return (
    <section id="hero" className="">
      <Container className="flex flex-col items-center gap-8 md:gap-12">
        <Title
          as="h1"
          className="text-center tracking-[-0.04em] font-extrabold leading-[1.1] bg-white bg-gradient-to-b from-white to-ring/50 bg-clip-text text-transparent"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
          }}
        >
          The pre-production <br className="md:hidden" />
          tool
          <br className="hidden md:inline" /> for the modern{' '}
          <br className="md:hidden" />
          video creator
        </Title>
        <HeroCTA />
        <div className="relative w-full mt-8">
          <ModuleButtonReplica
            className="absolute top-0 right-0 -translate-y-[75%] rotate-12 opacity-80"
            icon="Presentation"
            label="Storyboard"
          />
          <ModuleButtonReplica
            className="absolute top-0 left-0 -translate-y-[90%] translate-x-[15%] -rotate-12 opacity-80"
            icon="Map"
            label="Locations"
          />
          <div className="p-2 md:p-3 border rounded-3xl bg-muted relative w-full shadow-[0_0_40px_30px_rgba(22,23,24,0.9)]">
            {/* <div className="aspect-video relative w-full border md:border-2 border-ring rounded-2xl overflow-hidden"> */}
            <div
              className="aspect-video overflow-hidden relative w-full rounded-2xl"
              style={{
                background:
                  'linear-gradient(#0000ff00, #0000ff00) padding-box, linear-gradient(-45deg, #7A7A7A75, #7A7A7A30, #7A7A7A75) border-box',
                border: '2px solid transparent',
              }}
            >
              <Image src="/tv-placeholder.jpg" alt="tv-placeholder" fill />
            </div>
          </div>
        </div>
      </Container>
      {/* <p className="text-lg text-center max-w-[800px]">
        <Balancer>
          Going from 0 to 1 in video production shouldn’t take forever.
          Kickstart your next project with Lancie, the collaboration tool that
          helps you align better, faster and more transparently with your
          client.
        </Balancer>
      </p> */}
    </section>
  );
};

export default Hero;
