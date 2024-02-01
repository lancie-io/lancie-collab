'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import FeedbackForm from './FeedbackForm';

interface FeedbackButtonProps extends ButtonProps {}

const FeedbackButton = ({ className, ...props }: FeedbackButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          className={cn(className)}
          {...props}
          size="sm"
          variant="outline"
        >
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <FeedbackForm closePopover={handleClose} />
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackButton;
