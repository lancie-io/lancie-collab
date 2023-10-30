import { Icons } from './Icons';
import LoginButton from './LoginButton';

const LoginScreen = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[300px]">
      <div className="relative aspect-[4/2] md:aspect-square overflow-hidden bg-gradient-to-t from-brand-600 to-brand-400 grid place-items-center">
        <Icons.logoRaw className="w-1/3 md:w-1/2" />
      </div>
      <div className="flex flex-col items-center gap-6 p-6 py-20 md:p-12">
        <Icons.logoText className="w-[60%]" />
        <p className="text-muted-foreground">Log in in or sign up.</p>

        <LoginButton>
          <Icons.google className="w-5 h-5" />
          Login with Google
        </LoginButton>
      </div>
    </div>
  );
};

export default LoginScreen;
