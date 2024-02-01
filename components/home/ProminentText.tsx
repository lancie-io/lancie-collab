import Balancer from 'react-wrap-balancer';
import Container from '../shared/Container';

const ProminentText = () => {
  return (
    <section id="prominenttext">
      <Container>
        <p className="text-xl md:text-2xl text-center">
          <Balancer>
            Win every pitch, align seamlessly with your client, onboard anyone
            in seconds and plan your best video so far. All done together on
            your Lancie board.
          </Balancer>
        </p>
      </Container>
    </section>
  );
};

export default ProminentText;
