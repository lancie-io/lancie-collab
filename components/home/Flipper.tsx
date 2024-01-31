import { FlipperData } from '@/lib/content';
import { cn } from '@/lib/utils';
import Container from '../shared/Container';
import Title from '../shared/Title';

interface FlipperProps {
  data: FlipperData;
  flip: boolean;
}

const Flipper = ({ data, flip }: FlipperProps) => {
  const { keyword, colorClass, title, description } = data;
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16">
        <div className="space-y-4">
          <span className={cn('uppercase font-medium tracking-wider')}>
            {keyword}
          </span>
          <Title as="h2" className="font-bold text-4xl">
            {title}
          </Title>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            'aspect-video relative bg-muted overflow-hidden rounded-lg',
            flip && 'md:order-first'
          )}
        >
          Strong Visual
        </div>
      </div>
    </Container>
  );
};

export default Flipper;
