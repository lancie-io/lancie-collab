'use client';

import { setUserHasSeenWelcomeModal } from '@/lib/actions';
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
  title: any;
  content: string;
  image: string;
  id: number;
};

function getUserWelcome(name: string) {
  return `Welcome ${name}. Say hi to Lancie.`;
}

const getStepsWithUserName = (name: string) => [
  {
    label: 'Welcome',
    title: (
      <>
        Welcome {name}.<br />
        Say hi to Lancie.
      </>
    ),
    content: 'A new way to build up next-level video projects.',
    image: '/step-welcome.jpg',
    id: 0,
  },
  {
    label: 'Create',
    title: (
      <>
        Create
        <br />
        custom boards.
      </>
    ),
    content: 'New video project. New board. Better process.',
    image: '/step-build.jpg',
    id: 1,
  },
  {
    label: 'Build',
    title: (
      <>
        Build
        <br />
        modularly.
      </>
    ),
    content:
      'Lancie is designed upon the concept of modules. Drag them in and create concepts with ease.',
    image: '/step-build.jpg',
    id: 2,
  },
  {
    label: 'Publish',
    title: (
      <>
        Publish
        <br />
        your boards.
      </>
    ),
    content:
      'Share public board links with clients. Keep edit access to your collaborators.',
    image: '/step-publish.jpg',
    id: 3,
  },
  {
    label: 'Collaborate',
    title: (
      <>
        Collaborate
        <br />
        with team mates.
      </>
    ),
    content: 'Invite your team and stakeholders into the project with ease.',
    image: '/step-collaborate.jpg',
    id: 4,
  },
];

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepId, setCurrentStepId] = useState(0);
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
      setUserHasSeenWelcomeModal(user.id, true);
    }
  }, [user]);

  if (!user) {
    return;
  }

  const steps = getStepsWithUserName(user.name!);
  const handleNext = () => {
    if (currentStepId === steps.length - 1) {
      setIsOpen(false);
      return;
    }
    setCurrentStepId((prev) => prev + 1);
  };

  function isLast() {
    return currentStepId === steps.length - 1;
  }
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className="p-0 gap-0 max-w-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:shrink-0 md:bg-muted w-full md:w-[200px] ">
            <div className="pt-5 pb-4 md:p-6 md:pt-6 md:pb-6 md:border-b md:mb-4">
              <Icons.logoText className="w-1/3 mx-auto md:w-3/4" />
            </div>
            <HorizontalBar
              steps={steps}
              currentStepId={currentStepId}
              setCurrentStepId={setCurrentStepId}
            />
            <ul className="flex-col overflow-scroll hidden md:flex">
              {steps.map((step) => {
                const isActive = step.id === currentStepId;
                return (
                  <li
                    key={step.id}
                    className="py-2 md:pr-12 relative flex items-center cursor-pointer px-3 md:px-0"
                    onClick={() => setCurrentStepId(step.id)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="indicator"
                        className="bg-primary rounded-t-[2px] md:rounded-r-[3px] w-full h-1.5 md:h-full md:w-1.5 absolute bottom-0 md:left-0"
                      />
                    )}
                    <span
                      className={cn(
                        'md:ml-6 text-muted-foreground md:text-lg',
                        isActive && 'text-foreground font-semibold'
                      )}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="grow bg-background px-12 md:px-12 py-8 md:py-16 space-y-8 md:space-y-16">
            <div className="space-y-1 flex flex-col items-center text-center overflow-hidden">
              <Title mega className="text-xl md:text-2xl">
                {steps[currentStepId].title}
              </Title>
              <p className="text-muted-foreground h-12">
                {steps[currentStepId].content}
              </p>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg shadow-2xl border">
              <Image src={steps[currentStepId].image} alt="step" fill />
            </div>
          </div>
        </div>
        <div className="bg-muted flex justify-between border-t items-center p-3">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
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

interface HorizontalBarProps {
  steps: Step[];
  currentStepId: any;
  setCurrentStepId: any;
}

const HorizontalBar = ({
  steps,
  currentStepId,
  setCurrentStepId,
}: HorizontalBarProps) => {
  const [activeEl, setActiveEl] = useState();
  useEffect(() => {
    const element = document.getElementById(String(currentStepId));
    const listEl = document.getElementById('list');
    if (element && listEl) {
      console.log('element', element?.offsetLeft);
      listEl.scrollTo({
        left: element.offsetLeft - 64,
        behavior: 'smooth',
      });
      setWidth(element.getBoundingClientRect().width);
      setActiveEl(currentStepId);
    }
  }, [currentStepId]);

  const [width, setWidth] = useState(0);

  return (
    <ul
      className="relative border-b flex overflow-scroll no-scrollbar px-16 md:hidden"
      id="list"
    >
      {steps.map((step) => {
        const isActive = step.id === activeEl;
        return (
          <li
            key={step.id}
            className={cn('relative px-3 py-1.5 rounded-md')}
            onClick={() => setCurrentStepId(step.id)}
            id={String(step.id)}
          >
            {isActive && (
              <motion.div
                className="w-full h-1 bg-primary absolute bottom-0 left-0 rounded-t-[2px]"
                layoutId="indicatorsm"
              />
            )}
            <span
              className={cn(
                'text-muted-foreground',
                isActive && 'text-foreground font-semibold'
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
      <li className="block opacity-0 min-w-[800px] h-4 bg-gray-500 relative">
        pseudo
      </li>
    </ul>
  );
};
