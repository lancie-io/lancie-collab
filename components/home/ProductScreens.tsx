import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import MegaCTA from './MegaCTA';

const ProductScreens = () => {
  return (
    <section id="productscreens">
      <Container className="text-center">
        <div className="space-y-3 md:space-y-6 mb-4 md:mb-6">
          <Title mega className="text-3xl md:text-5xl">
            <span className="opacity-100">Grow your business</span>
          </Title>
          <p className="text-muted-foreground relative z-10 md:text-lg">
            Smooth productions at scale. <br />
            Keep track of all your projects in Lancie.
          </p>
        </div>

        <div className="relative flex justify-center w-[150%] md:w-full -translate-x-[16.67%] md:translate-x-0">
          <div className="aspect-video border rounded-2xl w-1/3 overflow-hidden absolute -translate-x-3/4 top-1/2 -translate-y-1/2 opacity-50">
            <Image src="/product-table.jpg" fill alt="screen" />
          </div>
          <div className="aspect-video absolute border rounded-2xl w-1/3 overflow-hidden translate-x-3/4 top-1/2 -translate-y-1/2 opacity-50">
            <Image src="/product-map.jpg" fill alt="screen" />
          </div>

          <div
            className="aspect-video rounded-lg md:rounded-2xl relative w-1/2 overflow-hidden shadow-[0_40px_50px_50px_rgba(22,23,24,0.9)] md:shadow-[0_80px_100px_100px_rgba(22,23,24,0.9)] backdrop-blur-lg"
            style={{
              background:
                'linear-gradient(#0000ff00, #0000ff00) padding-box, linear-gradient(30deg, #7A7A7A30, #27282A30) border-box',
              border: '2px solid transparent',
            }}
          >
            <Image src="/product-projects.jpg" fill alt="screen" />
          </div>
        </div>
        <MegaCTA id="product-screenss" />
      </Container>
    </section>
  );
};

export default ProductScreens;
