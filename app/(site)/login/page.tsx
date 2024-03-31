import Container from '@/components/shared/Container';
import LoginScreen from '@/components/shared/LoginScreen';

const LoginPage = () => {
  return (
    <>
      <Container className="max-w-[1200px] grow grid place-items-center py-8 md:py-16">
        <div className="w-full overflow-hidden rounded-lg border">
          <LoginScreen />
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
