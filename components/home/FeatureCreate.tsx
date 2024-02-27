import { cn } from '@/lib/utils';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import Title from '../shared/Title';

const FeatureCreate = () => {
  return (
    <section id="feature-create">
      <Container>
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-5">
            <div>
              <span
                className={cn(
                  'uppercase font-semibold tracking-wider bg-gradient-to-b from-green-400 to-green-600 bg-clip-text text-transparent'
                )}
              >
                Create
              </span>
              <Title
                as="h2"
                className="text-3xl md:text-5xl mt-2 tracking-[-0.04em] font-extrabold "
              >
                Build beautiful video concepts in seconds.
              </Title>
              <div className="relative col-span-12 rounded-3xl overflow-hidden md:hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(100%_65%_at_70%_65%,rgba(22,23,24,0)_0%,rgba(22,23,24,1.0)_100%)]"></div>
                <Image
                  src="/flipper-module-pointer.jpg"
                  alt="screenshot"
                  width={457}
                  height={361}
                  className="w-full"
                />
              </div>
              {/* Every great video starts with a clear common vision. Expressing
                your ideas and capturing them in one collaborative place has
                never been so easy and fun. Build it by yourself or together
                with your team.  */}
              <p className="text-lg md:text-xl text-muted-foreground mt-3">
                <Balancer>
                  Express your ideas faster and with more clarity using
                  pre-built modules.
                </Balancer>
              </p>
            </div>
          </div>
          <div className="relative col-span-6 col-start-7 rounded-3xl overflow-hidden hidden md:block">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(80%_65%_at_80%_70%,rgba(22,23,24,0)_0%,rgba(22,23,24,1.0)_100%)]"></div>
            <Image
              src="/flipper-module-pointer.jpg"
              alt="screenshot"
              width={457}
              height={361}
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureCreate;
