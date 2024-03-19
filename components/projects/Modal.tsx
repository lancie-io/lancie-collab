'use client';
import * as React from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@uidotdev/usehooks';

const ModalContext = React.createContext<{
  show: () => void;
  hide: () => void;
}>({
  show: () => {},
  hide: () => {},
});

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a modal provider.');
  }
  return context;
};

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  children,
  open: cOpen = false,
  onOpenChange: cOnOpenChange,
}: ModalProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = React.useState(cOpen);
  const hide = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(cOpen);
  }, [cOpen]);

  const show = () => {
    setOpen(true);
  };
  if (isDesktop) {
    return (
      <ModalContext.Provider value={{ show, hide }}>
        <Dialog open={open} onOpenChange={cOnOpenChange || setOpen}>
          {children}
        </Dialog>
      </ModalContext.Provider>
    );
  }
  return (
    <ModalContext.Provider value={{ show, hide }}>
      <Drawer open={open} onOpenChange={cOnOpenChange || setOpen}>
        {children}
      </Drawer>
    </ModalContext.Provider>
  );
};

interface ModalTriggerProps {
  children: React.ReactNode;
}

export const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogTrigger asChild>{children}</DialogTrigger>;
  }

  return <DrawerTrigger asChild>{children}</DrawerTrigger>;
};

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogContent className={className}>{children}</DialogContent>;
  }

  return <DrawerContent className={className}>{children}</DrawerContent>;
};

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalHeader = ({ children, ...props }: ModalHeaderProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogHeader {...props}>{children}</DialogHeader>;
  }

  return <DrawerHeader>{children}</DrawerHeader>;
};

interface ModalTitleProps {
  children: React.ReactNode;
}

export const ModalTitle = ({ children }: ModalTitleProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogTitle>{children}</DialogTitle>;
  }

  return <DrawerTitle>{children}</DrawerTitle>;
};

interface ModalDescriptionProps {
  children: React.ReactNode;
}

export const ModalDescription = ({ children }: ModalDescriptionProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogDescription>{children}</DialogDescription>;
  }

  return <DrawerDescription>{children}</DrawerDescription>;
};

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogFooter>{children}</DialogFooter>;
  }

  return <DrawerFooter>{children}</DrawerFooter>;
};

interface ModalCloseProps {
  children: React.ReactNode;
}

export const ModalClose = ({ children }: ModalCloseProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <DialogClose>{children}</DialogClose>;
  }

  return <DrawerClose>{children}</DrawerClose>;
};
