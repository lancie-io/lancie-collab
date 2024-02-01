import Link from 'next/link';
import Container from './Container';

const Footer = () => {
  return (
    <div className="border-t py-4 md:py-8">
      <Container className="text-muted-foreground flex justify-center text-sm">
        <ul className="flex gap-4">
          <li>© 2024 Lancie.</li>·
          <li>
            <Link href="/" className="hover:text-foreground">
              Data Privacy
            </Link>
          </li>
          ·
          <li>
            <Link href="/" className="hover:text-foreground">
              Imprint
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Footer;
