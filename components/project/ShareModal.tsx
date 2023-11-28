'use client';
import { getProjectUsers } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Avatar from '../shared/Avatar';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '../shared/modal';
import { ModalDescription } from '../shared/modal/ModalDescription';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { TProject } from './ProjectProvider';

const FormSchema = z.object({
  email: z.string().email(),
});

interface ShareModalProps {
  project: TProject;
}

const ShareModal = ({ project }: ShareModalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(JSON.stringify(data));
  }

  const { data } = useQuery({
    queryKey: ['projectUsers'],
    queryFn: async () => {
      return await getProjectUsers(project.id);
    },
  });

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>Share Edit Rights</ModalTitle>
        <ModalDescription>
          Share this document with people you are working on this together with.
        </ModalDescription>
      </ModalHeader>
      <ModalContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex gap-2 pt-1"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input
                    className="h-9"
                    placeholder="Enter email address..."
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" type="submit">
              Invite
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">
            Members
          </p>
          <div className="divide-y">
            {data?.data?.members.map((member) => (
              <div className="py-3 flex items-center gap-2" key={member.id}>
                <Avatar className="w-8 h-8" data={member} />
                <span>{member.name}</span>
                <div className="ml-auto text-sm text-muted-foreground">
                  Can edit
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
