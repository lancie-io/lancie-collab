'use clieent';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { createComment } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { CommentsContext } from './CommentsSidebar';

interface NewCommentProps {
  id: string;
}

const NewComment = ({ id }: NewCommentProps) => {
  const session = useSession();
  const router = useRouter();
  const formSchema = z.object({
    content: z.string(),
  });
  const { addComment } = useContext(CommentsContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createComment(id, values.content);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
      form.reset({
        content: '',
      });
    } else {
      toast.error(res.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border rounded-lg p-4 space-y-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write a comment..."
                    className="resize-none focus-visible:none focus-visible:ring-0 p-0 border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Button
              type="submit"
              variant="secondary"
              size="iconSmall"
              className="ml-auto"
            >
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewComment;
