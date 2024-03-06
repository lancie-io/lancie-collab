import { FlipperData } from '@/lib/flippercontent';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import Title from '../shared/Title';
import FlipperLabel from './flipper/FlipperLabel';

interface FlipperProps {
  data: FlipperData;
  flip: boolean;
}

const Flipper = ({ data, flip }: FlipperProps) => {
  const { label, fromColor, toColor, title, description, visual, narrow } =
    data;
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16 place-items-center place-content-center">
        <div className={cn('col-span-1 md:col-span-5')}>
          <FlipperLabel fromColor={fromColor} toColor={toColor}>
            {label}
          </FlipperLabel>
          <Title
            as="h2"
            className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl mt-1 md:mt-3"
            mega
          >
            {title}
          </Title>
          <div className={cn('md:hidden mt-4')}>{visual}</div>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 md:mt-4 max-w-[600px]">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div
          className={cn(
            'hidden md:block col-span-7',
            narrow && 'col-span-6 col-start-2',
            flip && 'order-first'
          )}
        >
          {visual}
        </div>
      </div>
    </Container>
  );
};

export default Flipper;
