'use client';

import { createProject } from '@/lib/actions';
import { useAuthUser } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
  name: z.string().trim().min(1, 'Name is required'),
});

const ProjectCreateForm = () => {
  const user = useAuthUser();
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
    if (!user) {
      toast.error('You need to be logged in to create a project');
      return;
    }

    const res = await createProject(values);

    if (res.success) {
      toast.success(res.message);
      trackEvent('Project Created', {
        name: values.name,
        email: user.email,
        amount: user.projects.length + 1,
      });
      router.refresh();
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
