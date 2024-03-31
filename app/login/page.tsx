import SiteHeader from '@/components/layout/SiteHeader';
import LoginScreen from '@/components/shared/LoginScreen';

const LoginPage = () => {
  return (
    <div className="grow flex flex-col relative">
      <SiteHeader blank className="relative border-b" />
      <LoginScreen className="grow" />
    </div>
  );
};

export default LoginPage;
