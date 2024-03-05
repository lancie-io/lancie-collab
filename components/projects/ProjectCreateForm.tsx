'use client';

import { createProject } from '@/lib/actions';
import { sendProjectCreated } from '@/lib/make';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useModal } from './Modal';

const formSchema = z.object({
  name: z.string(),
});

const ProjectCreateForm = () => {
  const session = useSession();
  const { hide } = useModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createProject(values);
    const makeProjectData = {
      name: values.name,
      email: session?.data?.user?.email,
      amount: session?.data?.user?.projects?.length,
    };
    if (res.success) {
      toast.success(res.message);
      sendProjectCreated(makeProjectData);
      router.refresh();
      trackEvent('Project Created', {
        name: values.name,
        email: session?.data?.user?.email,
      });
      hide();
    } else {
      toast.error(res.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="pb-6">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProjectCreateForm;
