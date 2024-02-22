'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { idGenerator } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VideosCustomInstance } from './VideosBuilderElement';
import { useVideoGallery } from './functions';
import { TVideoItem } from './types';

const formSchema = z.object({
  url: z.string().url(),
});

interface VideoAddButtonProps {
  element: VideosCustomInstance;
}

const VideoAddButton = ({ element }: VideoAddButtonProps) => {
  const [open, setOpen] = useState(false);
  const { addVideo } = useVideoGallery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const video: TVideoItem = { id: idGenerator(), url: data.url };
    addVideo({
      element,
      video,
    });
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button size="sm" variant="outline">
          <Link className="w-4 h-4" />
          <span>Embed</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <p className="text-sm mb-2 font-medium">Add Video URL</p>
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
                    placeholder="Enter video url..."
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" type="submit">
              Add
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default VideoAddButton;
