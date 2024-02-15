import { useProjectId } from '@/components/providers/ProjectProvider';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useBroadcastEvent } from '@/liveblocks.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Link, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { addFile, getFiles } from './actions';

const formSchema = z.object({
  url: z.string().url(),
});

const FileEmbedButton = () => {
  const [open, setOpen] = useState(false);
  const projectId = useProjectId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const { refetch } = useQuery({
    queryKey: ['files', projectId],
    queryFn: async () => getFiles({ projectId: projectId }),
  });

  const broadcast = useBroadcastEvent();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await addFile(data, projectId);
    if (res.success) {
      form.reset();
      refetch();
      broadcast({
        type: 'refetch',
        data: {
          key: ['files', projectId],
        },
      });
      setOpen(false);
    } else {
      toast.error('Failed to add file');
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button size="sm" variant="outline">
          <Link className="w-4 h-4" /> Add File URL
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <p className="text-sm mb-2 font-medium">Add File URL</p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-2"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input
                    className="h-9"
                    placeholder="Enter file url..."
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {!isSubmitting && 'Add'}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default FileEmbedButton;
