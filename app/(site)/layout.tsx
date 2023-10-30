import SiteHeader from '@/components/layout/SiteHeader';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};

export default SiteLayout;
