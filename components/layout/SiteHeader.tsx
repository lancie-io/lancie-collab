import Link from 'next/link';
import Container from '../shared/Container';
import { Icons } from '../shared/Icons';
import SignInOrAvatar from '../shared/SignInOrAvatar';

const SiteHeader = () => {
  return (
    <div className="border-b">
      <Container className="flex items-center justify-end h-14 md:h-16">
        <Link href="/" className="mr-auto">
          <Icons.logoText className="h-3 md:h-5" />
        </Link>
        {/* <FeedbackButton className="mr-4" /> */}
        <SignInOrAvatar />
      </Container>
    </div>
  );
};

export default SiteHeader;
