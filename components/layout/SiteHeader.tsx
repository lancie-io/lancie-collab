import Container from '../shared/Container';
import GoToAppButton from '../shared/GoToAppButton';
import { Icons } from '../shared/Icons';

const SiteHeader = () => {
  return (
    <div className="border-b ">
      <Container className="flex items-center justify-between h-16">
        <Icons.logoText className="h-5" />
        <GoToAppButton>Sign Up</GoToAppButton>
      </Container>
    </div>
  );
};

export default SiteHeader;
