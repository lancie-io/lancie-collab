'use client';
import { updateUser } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Switch } from '../ui/switch';

const formSchema = z.object({
  receiveComments: z.boolean(),
  receiveMarketing: z.boolean(),
});

const Notifications = ({
  userData,
}: {
  userData?: Prisma.UserGetPayload<{
    select: {
      id: true;
      receiveComments: true;
      receiveMarketing: true;
    };
  }> | null;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiveComments: userData?.receiveComments,
      receiveMarketing: userData?.receiveMarketing,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateUser(values);
    if (res.success) {
      toast.success('Settings updated successfully');
      router.refresh();
    } else {
      toast.error('Failed to update settings');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[600px] space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="receiveComments"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex">
                <div className="flex gap-8 items-center justify-between">
                  <div className="space-y-0">
                    <FormLabel>Comments</FormLabel>
                    <FormDescription>
                      Receive new comment activity.
                    </FormDescription>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiveMarketing"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex">
                <div className="flex gap-8 items-center justify-between">
                  <div className="space-y-0">
                    <FormLabel>Marketing</FormLabel>
                    <FormDescription>
                      Receive product updates and news about the Lancie tool.
                    </FormDescription>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}Save
        </Button>
      </form>
    </Form>
  );
};

export default Notifications;
