import { Presentation } from 'lucide-react';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section id="hero">
      <Container className="flex flex-col items-start gap-4">
        <Title
          as="h1"
          className="text-4xl lg:text-7xl text-left tracking-[-0.04em] font-extrabold"
        >
          How you pitch, collaborate and align with your client matters. Do it
          on your Lancie board.
        </Title>
        <Button className="bg-gradient-to-b from-brand-400 to-brand-600 text-foreground h-16 px-12 text-xl mt-4">
          Get Started
        </Button>
        <div className="p-3 border rounded-3xl bg-gradient-to-br from-accent to-background relative -left-3 w-[calc(100%+12px)] mt-16">
          <div className="aspect-video relative w-full border-2 border-ring rounded-2xl overflow-hidden">
            <Image src="/tv-placeholder.jpg" alt="tv-placeholder" fill />
          </div>
          <div className="aspect-square rounded-xl w-[112px] border-2 border-ring border-dashed absolute top-0 right-0 -translate-x-0 -translate-y-[110%] rotate-0 opacity-50"></div>
          <div className="aspect-square flex flex-col gap-2 font-medium bg-gradient-to-b rounded-xl from-accent to-muted items-center justify-center w-[128px] border-2 border-ring absolute top-0 right-0 translate-x-1/3 -translate-y-2/3 rotate-12">
            <Presentation className="w-8 h-8" />
            <span>Storyboard</span>
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
