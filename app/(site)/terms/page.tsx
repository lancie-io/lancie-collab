import MDXRenderer from '@/components/content/MDXRenderer';
import Container from '@/components/shared/Container';
import Title from '@/components/shared/Title';
import { getContent } from '@/lib/content';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Lancie terms.',
  robots: {
    follow: false,
    index: false,
  },
};

const TermsPage = async () => {
  const { data, content } = await getContent('terms');
  return (
    <Container className="grow py-12 md:py-20 max-w-[1200px]">
      <Title className="text-3xl md:text-5xl" mega>
        {data.title}
      </Title>
      <MDXRenderer content={content} />
    </Container>
  );
};

export default TermsPage;
