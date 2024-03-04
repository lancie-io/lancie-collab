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
  const { label, fromColor, toColor, title, description, visual } = data;
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16">
        <div>
          <FlipperLabel fromColor={fromColor} toColor={toColor}>
            {label}
          </FlipperLabel>
          <Title as="h2" className="text-3xl md:text-5xl mt-4" mega>
            {title}
          </Title>
          <p className="text-lg md:text-xl text-muted-foreground mt-5 max-w-[600px]">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <div className={cn(flip && 'order-first')}>{visual}</div>
      </div>
    </Container>
  );
};

export default Flipper;
