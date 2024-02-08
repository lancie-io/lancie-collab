'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

import { ImageIcon, Loader2, Pencil, Settings2, Trash } from 'lucide-react';
import { Button } from '../ui/button';

import { deleteProject, updateProject } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { FileUploadTrigger } from '../shared/upload/FileUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { GridProjectT } from './ProjectGrid';

interface ItemOptionsProps {
  project: GridProjectT;
  isOwner: boolean;
}

const ItemOptions = ({ project, isOwner }: ItemOptionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await deleteProject(id);
    if (res.success) {
      toast.success('Project deleted.');
    } else {
      toast.error('Project deletion failed.');
    }
    router.refresh();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="silent" size="iconSmall">
              <Settings2 className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <FileUploadTrigger>
              <DropdownMenuItem>
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Set thumbnail</span>
              </DropdownMenuItem>
            </FileUploadTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Rename</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem disabled={!isOwner}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModalDialogContent
          initValue={project.name}
          id={project.id}
          setModalOpen={setModalOpen}
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(project.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default ItemOptions;

const formSchema = z.object({
  name: z.string().max(50, {
    message: 'Project name must be at max 50 characters.',
  }),
});

const ModalDialogContent = ({
  initValue,
  id,
  setModalOpen,
}: {
  initValue: string | null;
  id: string;
  setModalOpen: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initValue as string | undefined,
    },
  });

  const router = useRouter();
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await updateProject(id, { name: values.name });
    if (res.success) {
      toast.success('Project updated.');
      router.refresh();
      setModalOpen(false);
    } else {
      toast.error('Project update failed.');
    }
  }
  return (
    <Form {...form}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Project Name</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end" type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </form>
      </DialogContent>
    </Form>
  );
};
