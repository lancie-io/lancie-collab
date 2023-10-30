import Container from '@/components/shared/Container';
import LoginScreen from '@/components/shared/LoginScreen';

const LoginPage = () => {
  return (
    <>
      <Container className="max-w-[1200px] grow grid place-items-center">
        <div className="rounded-lg border overflow-hidden">
          <LoginScreen />
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
