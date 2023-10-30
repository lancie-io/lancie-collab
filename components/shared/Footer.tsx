import Container from './Container';
import { Icons } from './Icons';

const Footer = () => {
  return (
    <div className="border-t py-16">
      <Container>
        <Icons.logoFull className="w-[128px] stroke-primary fill-primary" />
      </Container>
    </div>
  );
};

export default Footer;
