import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import Title from '../shared/Title';

const ProminentText = () => {
  return (
    <section id="prominenttext">
      <Container className="max-w-[1400px]">
        <Title className="text-xl md:text-5xl text-center" mega>
          <Balancer>
            <span className="text-muted-foreground leading-[1.2]">
              Win every pitch, align better with your client, onboard anyone in
              seconds and plan your best video so far.{' '}
            </span>
            <span className="text-foreground leading-[1.2]">
              Build it together on your Lancie board.
            </span>
          </Balancer>
        </Title>
      </Container>
    </section>
  );
};

export default ProminentText;
