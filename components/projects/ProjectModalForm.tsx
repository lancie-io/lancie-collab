import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  useModal,
} from '@/components/shared/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createProject } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormSubmitButton from '../shared/form/FormSubmitButton';
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z.string(),
});

const ProjectModalForm = () => {
  const { hide } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
    },
  });

  const router = useRouter();
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createProject(values);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
      hide();
    } else {
      toast.error(res.message);
    }
  }
  return (
    <Form {...form}>
      <Modal as="form" onSubmit={form.handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle>Create Project</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-6">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSubmitButton
            className="w-full"
            label="Create"
            isSubmitting={isSubmitting}
          />
        </ModalContent>
      </Modal>
    </Form>
  );
};

export default ProjectModalForm;
