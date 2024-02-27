import { Quote } from 'lucide-react';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import TestimonialVideo from './TestimonialVideo';

const Testimonial = () => {
  const renderMaik = () => (
    <div className="flex gap-2 md:gap-4 items-center">
      <Image
        src="/creator-maik.jpg"
        width={80}
        height={80}
        alt="Creator Maik"
        className="rounded-full overflow-hidden w-10 h-10 md:w-16 md:h-16"
      />
      <div>
        <h3 className="font-medium md:text-lg">Maik</h3>
        <p className="text-sm md:text-base text-muted-foreground">@maik.hns</p>
      </div>
    </div>
  );
  return (
    <section id="testimonial">
      <Container>
        <div className="grid grid-cols-5 gap-6 md:gap-16 items-center">
          <div className="col-span-5 md:col-span-3 flex flex-col gap-6 md:gap-8">
            <div className="flex justify-between items-end">
              <Quote className="w-16 md:w-20 h-16 md:h-20" />
              <div className="md:hidden">{renderMaik()}</div>
            </div>
            <Title className="text-xl md:text-4xl text-muted-foreground">
              Whenever I start a new project, I create a unique visual Lancie
              board allowing me to{' '}
              <span className="text-foreground">
                bring every aspect of my vision to life
              </span>
              .
            </Title>
            <div className="hidden md:block">{renderMaik()}</div>
          </div>
          <div className="col-span-5 md:col-span-2">
            <TestimonialVideo />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
