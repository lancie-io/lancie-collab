import Container from '../shared/Container';
import { Icons } from '../shared/Icons';
import { Button } from '../ui/button';

const SiteHeader = () => {
  return (
    <div className="border-b ">
      <Container className="flex items-center justify-between h-16">
        <Icons.logoText className="h-5" />
        <Button>Sign Up</Button>
      </Container>
    </div>
  );
};

export default SiteHeader;
