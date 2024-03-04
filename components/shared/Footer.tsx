import Link from 'next/link';
import Container from './Container';

const Footer = () => {
  return (
    <div className="border-t py-6 md:py-8">
      <Container className="text-muted-foreground flex justify-center text-sm">
        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 text-center">
          <li>© 2024 Lancie.</li>
          <span className="hidden md:inline">·</span>
          <li>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
          </li>
          <span className="hidden md:inline">·</span>
          <li>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Footer;
