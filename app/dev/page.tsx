'use client';

import DevSettings from '@/components/dev/DevSettings';
import Container from '@/components/shared/Container';
import Title from '@/components/shared/Title';

const DevPage = () => {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="pb-6 md:py-10">
          <Title>Dev Settings</Title>
          <p className="text-primary mt-1">
            After any settings update, refresh the browser (CMD+R) to make sure
            that changes take effect.
          </p>
        </div>
        <DevSettings />
      </Container>
    </div>
  );
};

export default DevPage;
