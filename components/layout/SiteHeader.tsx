import Link from 'next/link';
import FeedbackButton from '../FeedbackButton/FeedbackButton';
import Container from '../shared/Container';
import GoToAppButton from '../shared/GoToAppButton';
import { Icons } from '../shared/Icons';

const SiteHeader = () => {
  return (
    <div className="border-b ">
      <Container className="flex items-center justify-between h-14 md:h-16">
        <Link href="/">
          <Icons.logoFull className="h-5 md:h-8" />
        </Link>
        <div>
          <FeedbackButton />
          <GoToAppButton>Sign Up</GoToAppButton>
        </div>
      </Container>
    </div>
  );
};

export default SiteHeader;
