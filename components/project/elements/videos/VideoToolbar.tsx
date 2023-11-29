'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileVideo2, Link } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { BuilderElementInstance } from '../../BuilderElements';
import useBuilder from '../../hooks/useBuilder';
import { VideosCustomInstance } from './VideosBuilderElement';

const FormSchema = z.object({
  url: z.string().url(),
});

const VideoToolbar = ({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) => {
  const element = elementInstance as VideosCustomInstance;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: undefined,
    },
  });
  const { updateElement } = useBuilder();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        videos: [...element.extraAttributes.videos, data.url],
      },
    });
    setOpen(false);
    toast.success(JSON.stringify(data));
  }

  return (
    <div className="border-b p-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button size="iconSmall" variant="outline">
            <Link className="w-4 h-4" />
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
                Add Video
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
      <Button size="iconSmall" variant="outline">
        <FileVideo2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VideoToolbar;
