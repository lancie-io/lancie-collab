import { Icons } from './Icons';
import LoginButton from './LoginButton';
import LoginEmailForm from './LoginEmailForm';
import Title from './Title';

const LoginScreen = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="relative aspect-[4/2] md:aspect-auto md:h-full w-full overflow-hidden bg-gradient-to-t from-brand-600 to-brand-400 flex flex-col items-center justify-center">
        <Icons.logoText className="w-1/2 md:w-1/2" />
      </div>
      <div className="flex flex-col items-center gap-6 py-12 px-6 md:px-12 md:py-20 order-first">
        <Title className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
          Welcome
        </Title>
        <p className="text-muted-foreground -mt-2">Log in or sign up.</p>
        <div className="space-y-2">
          <LoginButton className="w-[240px]" provider="google">
            <Icons.google className="w-5 h-5" />
            Login with Google
          </LoginButton>
          <p className="text-muted-foreground text-sm text-center">or</p>
          <LoginEmailForm />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
