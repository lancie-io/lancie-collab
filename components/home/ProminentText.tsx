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
              The collaboration tool for videographers{' '}
            </span>
            <span className="text-foreground leading-[1.2]">
              that care about quality.
            </span>
          </Balancer>
        </Title>
      </Container>
    </section>
  );
};

export default ProminentText;
