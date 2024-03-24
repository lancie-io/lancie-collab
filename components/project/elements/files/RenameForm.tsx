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
import { useAuthUser } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useFiles from './useFiles';

const formSchema = z.object({
  name: z.string(),
});

const RenameForm = ({
  fileId,
  name,
  setOpen,
}: {
  fileId: string;
  name?: string | null;
  setOpen: (open: boolean) => void;
}) => {
  const { renameFile } = useFiles();
  const user = useAuthUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name as string | undefined,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error('You need to be logged in to rename');
      return;
    }

    const res = await renameFile({ fileId, newName: values.name });

    if (res.success) {
      toast.success('File renamed.');
      setOpen(false);
    } else {
      toast.error('Renaming failed.');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter custom file name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-1.5" disabled={isSubmitting} tabIndex={1}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Rename
        </Button>
      </form>
    </Form>
  );
};

export default RenameForm;
