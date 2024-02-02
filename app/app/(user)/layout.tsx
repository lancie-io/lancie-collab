import AppSidebar from '@/components/layout/AppSidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grow flex " style={{ height: '100dvh' }}>
      <div className="w-[240px] border-r hidden md:block">
        <AppSidebar />
      </div>
      <div className="grow px-3 md:px-8 lg:px-16 py-3 md:py-6 lg:py-12 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
