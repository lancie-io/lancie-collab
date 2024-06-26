'use client';
import { Modal, ModalContent } from '@/components/projects/Modal';
import LoginScreen from '@/components/shared/LoginScreen';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginModal = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setTimeout(() => router.back(), 200);
    }
  }, [open]);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent className="p-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl z-50">
        <LoginScreen />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
