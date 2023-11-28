'use client';

import { Switch } from '@/components/ui/switch';
import { updateProject } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '../shared/modal';
import { ModalDescription } from '../shared/modal/ModalDescription';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';
import { TProject } from './ProjectProvider';

const FormSchema = z.object({
  published: z.boolean(),
});

interface PublishModalProps {
  project: TProject;
  setProject: (project: TProject) => void;
}

const PublishModal = ({ project, setProject }: PublishModalProps) => {
  const publishUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/project/12312312`;
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [published, setPublished] = useState(project.published);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(publishUrl);
      setCopiedToClipboard(true);
      toast.success('Copied to clipboard');
      setTimeout(() => {
        setCopiedToClipboard(false);
      }, 3000);
    } catch {
      return;
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      published: project.published,
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await updateProject(project.id, data);
    if (!res.success) {
      toast.error('Project could not be published.');
      return;
    } else {
      if (data.published) {
        toast.success('Project published');
      } else {
        toast.success('Project unpublished');
      }
      setPublished(data.published);
      setProject({ ...project, published: data.published });
    }
  }

  // const published = form.watch('published');

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);
  return (
    <Modal>
      <ModalHeader className="max-w-[500px]">
        <ModalTitle>Publish Document</ModalTitle>
        <ModalDescription>
          If you enable public share link, anyone with the link will be able to
          view and comment but not edit the document.
        </ModalDescription>
      </ModalHeader>
      <ModalContent className="space-y-4 max-w-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 gap-8 w-full">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish status</FormLabel>
                    <FormDescription>
                      Publish via public share link
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        {published && (
          <div className="flex gap-2">
            <Input className="h-9" value={publishUrl} readOnly />
            {copiedToClipboard ? (
              <Button size="sm" variant="success">
                <Check className="w-5 h-5" />
                Copied
              </Button>
            ) : (
              <Button size="sm" onClick={handleCopyToClipboard}>
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PublishModal;
