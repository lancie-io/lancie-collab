'use client';
import { trackEvent } from '@/components/providers/Analytics';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createInvite } from '@/lib/actions';
import { useAuthUser } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import InfoTooltip from './InfoTooltip';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
});

interface ShareFormProps {
  projectId: string;
}

const ShareForm = ({ projectId }: ShareFormProps) => {
  const user = useAuthUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createInvite({
      email: values.email,
      projectId,
    });
    if (res.success) {
      toast.success(`Invite sent to ${values.email}`);
      trackEvent('Collaborator Invited', {
        fromEmail: user?.email,
        toEmail: values.email,
        projectId,
      });
      form.reset();
    } else {
      toast.error(res.message);
    }
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="shrink-0">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <div className="flex items-center gap-1.5">
                  <FormLabel>Invite collaborators</FormLabel>
                  <InfoTooltip>Members of the board can edit.</InfoTooltip>
                </div>
              </div>
              <FormControl className="flex">
                <div className="flex gap-2">
                  <Input
                    className=""
                    placeholder="Enter email..."
                    {...field}
                    disabled={isSubmitting}
                  />
                  <Button
                    className="grow-0"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Invite
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ShareForm;
