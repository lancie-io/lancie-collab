import { cn } from '@/lib/utils';
import colors from '@/resolveConfig';
import Image from 'next/image';
import Container from '../shared/Container';
import Title from '../shared/Title';

const FeatureCollaborate = () => {
  return (
    <section id="feature-create">
      <Container>
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-5">
            <div>
              <span
                className={cn(
                  'uppercase font-semibold tracking-wider bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent'
                )}
              >
                Collaborate
              </span>
              <Title
                as="h2"
                className="text-3xl md:text-5xl mt-2 tracking-[-0.04em] font-extrabold "
              >
                Do it together. Realtime.
              </Title>
              <p className="text-lg text-muted-foreground mt-3 hidden md:block">
                Iron out the details together, onboard crew/cast in seconds and
                be 100% aligned before moving into production confidently. No
                more fear of endless editing feedback rounds. With Lancie,
                everyone is on the same page from the start.
              </p>
            </div>
          </div>
          <div className="relative col-span-10 col-start-2 md:col-start-8 md:col-span-3 my-8 md:my-0">
            <div className="relative border-2 rounded-3xl overflow-hidden">
              <Image
                src="/flipper-comment.jpg"
                alt="screenshot"
                width={457}
                height={361}
                className="w-full"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(90%_50%_at_50%_40%,rgba(22,23,24,0)_0%,rgba(22,23,24,0.8)_100%)]"></div>
            </div>
            <Avatar
              src="/verena.jpg"
              color={colors.fuchsia[500]}
              className="w-8 md:w-24 absolute top-0 right-1/4 -translate-y-3/4"
            />
            <Avatar
              src="/felix.jpg"
              color={colors.violet[500]}
              className="w-24 md:w-40 absolute left-0 bottom-1/4 -translate-x-1/4 md:-translate-x-3/4"
            />
            <Avatar
              src="/mats.jpg"
              color={colors.rose[500]}
              className="w-16 md:w-32 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
            />
          </div>
          <p className="text-lg text-muted-foreground mt-3 md:hidden col-span-12">
            Iron out the details together, onboard crew/cast in seconds and be
            100% aligned before moving into production confidently. No more fear
            of endless editing feedback rounds. With Lancie, everyone is on the
            same page from the start.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FeatureCollaborate;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  color: string;
}

const Avatar = ({ src, color, className, ...props }: AvatarProps) => {
  return (
    <div
      className={cn(
        'relative aspect-square rounded-full border-2 md:border-4',
        className
      )}
      {...props}
      style={{
        borderColor: color,
      }}
    >
      <div className="relative aspect-square rounded-full border-2 md:border-4   border-background overflow-hidden">
        <Image src={src} alt="avatar" fill />
      </div>
    </div>
  );
};
