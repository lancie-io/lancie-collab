import { Icons } from './Icons';
import LoginButton from './LoginButton';
import Title from './Title';

const LoginScreen = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="relative aspect-[4/2] md:aspect-auto md:h-full w-full overflow-hidden bg-gradient-to-t from-brand-600 to-brand-400 flex flex-col items-center justify-center">
        <Icons.logoText className="w-1/2 md:w-1/2" />
      </div>
      <div className="flex flex-col items-center gap-6 p-6 py-20 md:p-12 order-first">
        <Icons.logoRaw className="w-12 md:w-16" />
        <Title className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
          Welcome
        </Title>
        <p className="text-muted-foreground -mt-2">Log in or sign up.</p>
        <div className="space-y-3">
          <LoginButton className="w-[200px]" provider="google">
            <Icons.google className="w-5 h-5" />
            Login with Google
          </LoginButton>
          <LoginButton className="w-[200px]" variant="outline" provider="email">
            Login with Email
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
