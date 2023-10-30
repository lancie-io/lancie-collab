import SiteHeader from '@/components/layout/SiteHeader';
import Footer from '@/components/shared/Footer';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
