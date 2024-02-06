'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

interface ShareFormProps {
  projectId: string;
}

const ShareForm = ({ projectId }: ShareFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createInvite({
      email: values.email,
      projectId,
    });
    if (res.success) {
      toast.success(`Invite sent to ${values.email}`);
      form.setValue('email', undefined as unknown as string);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="flex">
                <div className="flex gap-2">
                  <Input placeholder="Enter email..." {...field} />
                  <Button className="grow-0" disabled={isSubmitting}>
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
