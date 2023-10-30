import Image from 'next/image';
import Container from '../shared/Container';

const Visual = () => {
  return (
    <section>
      <Container>
        <div className="aspect-[1200/627] relative w-full md:w-3/4 mx-auto rounded-lg md:rounded-2xl overflow-hidden shadow-2xl ">
          <Image src={'/visual.jpg'} fill alt="hero-visual" objectFit="cover" />
        </div>
      </Container>
    </section>
  );
};

export default Visual;
