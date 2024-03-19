import SiteHeader from '@/components/layout/SiteHeader';
import Container from '@/components/shared/Container';
import { Icons } from '@/components/shared/Icons';
import Title from '@/components/shared/Title';
import { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';

export const metadata: Metadata = {
  title: 'Verify',
  robots: {
    follow: false,
    index: false,
  },
};

const VerifyPage = () => {
  return (
    <div className="grow flex flex-col">
      <SiteHeader blank className="absolute" />
      <div className="grow grid place-items-center">
        <Container className="flex flex-col items-center gap-8">
          <Icons.inviteLancieMail className="w-32" />
          <div className="text-center max-w-[500px] space-y-2">
            <Title>Login Email Sent</Title>
            <p className="text-muted-foreground">
              <Balancer>
                Click the link we sent you to sign in. Sometimes this can land
                in Spam. We hope that this isn&apos;t the case. If it
                doesn&apos;t arrive in a minute or two, please check.
              </Balancer>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default VerifyPage;
