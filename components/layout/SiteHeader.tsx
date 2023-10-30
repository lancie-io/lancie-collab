import Link from 'next/link';
import Container from '../shared/Container';
import GoToAppButton from '../shared/GoToAppButton';
import { Icons } from '../shared/Icons';

const SiteHeader = () => {
  return (
    <div className="border-b ">
      <Container className="flex items-center justify-between h-14 md:h-16">
        <Link href="/">
          <Icons.logoText className="h-4 md:h-5" />
        </Link>
        <GoToAppButton>Sign Up</GoToAppButton>
      </Container>
    </div>
  );
};

export default SiteHeader;
