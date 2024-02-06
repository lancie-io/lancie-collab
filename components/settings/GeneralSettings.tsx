'use client';
import { updateUser } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import UploadProvider, { UploadedFile } from '../shared/upload/UploadProvider';
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
import { Label } from '../ui/label';
import UserImage from './UserImage';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});

const GeneralSettings = ({
  user,
}: {
  user?: Prisma.UserGetPayload<{}> | null;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name as string | undefined,
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

  async function uploadFile(file: UploadedFile) {
    console.log(file);
    const res = await updateUser({
      image: file.url,
    });
    if (res.success) {
      toast.success('Profile picture updated successfully');
      router.refresh();
    } else {
      toast.error('Failed to update profile picture');
    }
  }
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start pt-4">
      <UploadProvider onFileChange={uploadFile}>
        <UserImage user={user} />
      </UploadProvider>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-[300px] grow"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="flex">
                  <Input {...field} placeholder="Enter your name..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label>Email</Label>
            <Input readOnly value={user?.email} disabled />
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettings;
