import AppSidebar from '@/components/layout/AppSidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grow flex">
      <AppSidebar />
      <div className="grow px-16 py-12">{children}</div>
    </div>
  );
};

export default AppLayout;
