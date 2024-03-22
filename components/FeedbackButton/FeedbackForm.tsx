'use client';

import { useAuthUser } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { trackEvent } from '../providers/Analytics';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { createFeedback } from './actions';

const formSchema = z.object({
  message: z.string().min(3, {
    message: 'Feedback must be at least 3 characters.',
  }),
});

interface FeedbackFormProps {
  closePopover: () => void;
}

const FeedbackForm = ({ closePopover }: FeedbackFormProps) => {
  const user = useAuthUser();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error('Please login to submit feedback.');
      return;
    }
    const newFeedback: Prisma.FeedbackCreateInput = {
      message: values.message,
      email: user.email,
      path: pathname,
      type: 'sidebar',
    };
    const res = await createFeedback(newFeedback);
    if (res.success) {
      trackEvent('Feedback Submitted', {
        text: values.message,
        email: user.email,
      });
      form.reset();
      toast.success('Feedback submitted.');
      closePopover();
    } else {
      toast.error('Error submitting feedback.');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={3} {...field} placeholder="Enter feedback..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          )}
          {!isSubmitting && 'Send'}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
