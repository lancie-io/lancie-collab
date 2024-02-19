'use client';

import { useAuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Modal, ModalContent } from '../projects/Modal';
import { Icons } from '../shared/Icons';
import Title from '../shared/Title';
import { Button } from '../ui/button';

type Step = {
  label: string;
  title: string;
  content: string;
  image: string;
  id: number;
};

const steps: Step[] = [
  {
    label: 'Welcome',
    title: 'Say hi to Lancie',
    content: 'A new way to build up next-level video projects.',
    image: '/step-welcome.jpg',
    id: 0,
  },
  {
    label: 'Create',
    title: 'Create boards',
    content: 'New video project. New board. Better process.',
    image: '/step-build.jpg',
    id: 1,
  },
  {
    label: 'Build',
    title: 'Build modularly',
    content:
      'Lancie is designed upon the concept of modules. Drag them in and create concepts with ease.',
    image: '/step-build.jpg',
    id: 2,
  },
  {
    label: 'Publish',
    title: 'Publish your boards',
    content:
      'Share public board links with clients. Keep edit access to your collaborators.',
    image: '/step-publish.jpg',
    id: 3,
  },
  {
    label: 'Collaborate',
    title: 'Collaborate with team mates',
    content: 'Invite your team and stakeholders into the project with ease.',
    image: '/step-collaborate.jpg',
    id: 4,
  },
];

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepId, setCurrentStepId] = useState(0);

  const handleNext = () => {
    if (currentStepId === steps.length - 1) {
      setIsOpen(false);
      return;
    }
    setCurrentStepId((prev) => prev + 1);
  };

  const user = useAuthUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.hasSeenWelcomeModal) {
      return;
    } else {
      console.log('executed');
      setIsOpen(true);
    }
  }, [user]);

  function isLast() {
    return currentStepId === steps.length - 1;
  }
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className="p-0 gap-0 max-w-2xl">
        <div className="flex">
          <ul className="shrink-0 bg-muted w-[200px]">
            <div className="p-6 border-b mb-4">
              <Icons.logoText className="w-3/4" />
            </div>
            {steps.map((step) => {
              const isActive = step.id === currentStepId;
              return (
                <li
                  key={step.id}
                  className="py-2 pr-12 relative flex items-center cursor-pointer"
                  onClick={() => setCurrentStepId(step.id)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="indicator"
                      className="bg-primary rounded-r-[3px] h-full w-1.5 absolute"
                    />
                  )}
                  <span
                    className={cn(
                      'ml-6 text-muted-foreground text-lg',
                      isActive && 'text-foreground font-semibold'
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="grow bg-background px-12 py-16 space-y-4">
            <div className="space-y-1 flex flex-col items-center text-center h-[100px] overflow-hidden">
              <Title mega>{steps[currentStepId].title}</Title>
              <p className="text-muted-foreground">
                {steps[currentStepId].content}
              </p>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg shadow-2xl border">
              <Image src={steps[currentStepId].image} alt="step" fill />
            </div>
          </div>
        </div>
        <div className="bg-muted flex justify-between border-t items-center p-3">
          <Button variant="ghost" size="sm">
            Got it
          </Button>
          <Button variant={'primary'} size="sm" onClick={handleNext}>
            {isLast() ? 'Start' : 'Next'}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
