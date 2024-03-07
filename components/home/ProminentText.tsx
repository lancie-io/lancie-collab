import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';
import Title from '../shared/Title';

const ProminentText = () => {
  return (
    <section id="prominenttext" className="-my-8">
      <Container className="max-w-[1400px]">
        <Title className="text-2xl sm:text-3xl md:text-5xl text-center" mega>
          <Balancer>
            <span className="text-muted-foreground">
              Create, collaborate, and align your next shoot with ease.
            </span>{' '}
            <span className="text-foreground">All on your Lancie board.</span>
          </Balancer>
        </Title>
      </Container>
    </section>
  );
};

export default ProminentText;
