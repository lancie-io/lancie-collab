import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../shared/Container';
import Title from '../shared/Title';
import { buttonVariants } from '../ui/button';

const ProductScreens = () => {
  return (
    <section id="productscreens">
      <Container className="text-center space-y-4 md:space-y-8">
        <Title mega className="text-3xl md:text-5xl">
          <span className="opacity-100">Do better.</span> <br />
          Do more.
        </Title>
        <p className="text-muted-foreground relative z-10 md:text-lg">
          Lancie is built to scale your quality and output. <br />
          Keep track of all your projects in Lancie.
        </p>

        <div className="relative flex justify-center w-[150%] md:w-full -translate-x-[16.67%] md:translate-x-0">
          <div className="aspect-video border rounded-2xl w-1/3 overflow-hidden absolute -translate-x-3/4 top-1/2 -translate-y-1/2 opacity-50">
            <Image src="/product-table.jpg" fill alt="screen" />
          </div>
          <div className="aspect-video absolute border rounded-2xl w-1/3 overflow-hidden translate-x-3/4 top-1/2 -translate-y-1/2 opacity-50">
            <Image src="/product-map.jpg" fill alt="screen" />
          </div>

          <div
            className="aspect-video rounded-lg md:rounded-2xl relative w-1/2 overflow-hidden shadow-[0_40px_50px_50px_rgba(22,23,24,0.9)] md:shadow-[0_80px_100px_100px_rgba(22,23,24,0.9)]"
            style={{
              background:
                'linear-gradient(#0000ff00, #0000ff00) padding-box, linear-gradient(30deg, #7A7A7A, #27282A) border-box',
              border: '1px solid transparent',
            }}
          >
            <Image src="/product-projects.jpg" fill alt="screen" />
          </div>
        </div>
        <Link
          href="/app"
          className={cn(
            buttonVariants({
              variant: 'primary',
            }),
            'relative z-10'
          )}
        >
          Start Project
        </Link>
      </Container>
    </section>
  );
};

export default ProductScreens;
