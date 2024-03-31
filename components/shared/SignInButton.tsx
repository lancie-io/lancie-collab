'use client';
import { Modal, ModalContent, ModalTrigger } from '../projects/Modal';
import { Button, ButtonProps } from '../ui/button';
import LoginScreen from './LoginScreen';

interface SignInButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const SignInButton = ({
  children,
  variant,
  size,
  className,
  ...props
}: SignInButtonProps) => {
  return (
    <Modal>
      <ModalTrigger>
        <Button
          variant={variant || 'primary'}
          size={size || 'sm'}
          className={className}
          {...props}
        >
          {children}
        </Button>
      </ModalTrigger>
      <ModalContent className="p-0 z-50 md:max-w-[700px]">
        <LoginScreen />
      </ModalContent>
    </Modal>
  );
};

export default SignInButton;
