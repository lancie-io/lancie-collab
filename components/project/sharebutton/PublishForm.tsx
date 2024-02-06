'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { updateProject } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useProject } from '../ProjectProvider';

const formSchema = z.object({
  published: z.boolean(),
});

interface PublishFormProps {
  projectId?: string;
}

const PublishForm = () => {
  const { project, setProject } = useProject();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: project.published,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateProject(project.id, values);
    if (res.success) {
      toast.success('Project updated.');
      setProject({ ...project, published: values.published });
    } else {
      toast.error('Project update failed');
    }
  }

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full overflow-hidden"
      >
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presentation View</FormLabel>
              {/* <FormDescription>
                If you enable public share link, anyone with the link will be
                able to view and comment but not edit the document.
              </FormDescription> */}
              <FormControl>
                <div className="flex gap-8 items-center h-[60px]">
                  <Switch
                    className="scale-125 origin-left shrink-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  {!project.published && (
                    <p className="text-sm text-muted-foreground">
                      This project is{' '}
                      <span className="text-yellow-500">
                        not publicly accessible.
                      </span>
                    </p>
                  )}
                  {project.published && (
                    <p className="text-sm text-muted-foreground grow-0 shrink overflow-scroll">
                      The project is{' '}
                      <span className="text-green-500">
                        publicly accessible
                      </span>{' '}
                      via this link:{' '}
                      <Link
                        target="_blank"
                        href={
                          process.env.NEXT_PUBLIC_HOST_URL +
                          '/project/' +
                          project.id
                        }
                        className="font-medium hover:underline text-foreground"
                      >
                        {process.env.NEXT_PUBLIC_HOST_URL +
                          '/project/' +
                          project.id}
                      </Link>
                    </p>
                  )}
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

export default PublishForm;
