'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { browserName, isMobile, osName } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
  const session = useSession();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newFeedback: Prisma.FeedbackCreateInput = {
      message: values.message,
      email: session?.data?.user?.email,
      path: pathname,
      type: 'header',
    };
    const res = await createFeedback(newFeedback);
    if (res.success) {
      toast.success('Feedback submitted.');
      form.reset();
      await fetch(
        'https://hook.eu2.make.com/gfnes4f6ofny8cwuxmebm1wyx4p86p1u',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...res.data,
            browser: browserName,
            os: osName,
            platform: isMobile ? 'mobile' : 'desktop',
            resolution: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
          }),
        }
      );
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
        <Button className="w-full" type="submit">
          Send
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
