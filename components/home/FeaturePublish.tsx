import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';
import { Button } from '../ui/button';

const FeaturePublish = () => {
  return (
    <section id="feature-create">
      <Container>
        <div className="grid grid-cols-12 items-center ">
          <div className="relative col-span-10 col-start-2 md:col-span-5 md:col-start-1 mt-8 mb-12 md:mt-0 md:mb-0 order-last md:order-none">
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(80%_65%_at_80%_70%,rgba(22,23,24,0)_0%,rgba(22,23,24,1.0)_100%)]"></div> */}
            <Image
              src="/feature-publish.jpg"
              alt="screenshot"
              width={241}
              height={182}
              className="w-full"
            />
            <div className="absolute right-1/3 md:right-1/4 bottom-0 rotate-3 w-16 md:w-24 aspect-square rounded-xl bg-gradient-to-b from-accent to-muted shadow-xl grid place-items-center -translate-y-1/4">
              <Link className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <Button
              variant="primary"
              className="px-12 md:px-24 py-8 md:py-12 absolute right-0 bottom-0 text-xl md:text-2xl translate-x-1/4 md:translate-x-1/3 translate-y-1/3 -rotate-12"
            >
              Publish
            </Button>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <div>
              <span
                className={cn(
                  'uppercase font-semibold tracking-wider bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent'
                )}
              >
                Pitch
              </span>
              <Title
                as="h2"
                className="text-3xl md:text-5xl mt-2 tracking-[-0.04em] font-extrabold "
              >
                Impress clients with a stunning board.
              </Title>
              <p className="text-lg text-muted-foreground mt-3 hidden md:block">
                Share your board link and blow your client away with a carefully
                crafted concept that exceeds their expectations. Including the
                important details that always need to be covered. No more boring
                paperwork, you just focus on what you love to do.
              </p>
            </div>
          </div>{' '}
        </div>
        <p className="text-lg text-muted-foreground mt-3 md:hidden col-span-12">
          Share your board link and blow your client away with a carefully
          crafted concept that exceeds their expectations. Including the
          important details that always need to be covered. No more boring
          paperwork, you just focus on what you love to do.
        </p>
      </Container>
    </section>
  );
};

export default FeaturePublish;
