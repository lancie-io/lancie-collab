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
import { JSONContent } from '@tiptap/react';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BuilderElementInstance } from '../../BuilderElements';
import { useBuilder } from '../../BuilderProvider';
import { VideosCustomInstance } from './VideosBuilderElement';

export type TVideoItem = {
  id: string;
  url: string;
  notes?: JSONContent;
};

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
    const newVideoItem: TVideoItem = { id: idGenerator(), url: data.url };
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        id: z.string(),
        videos: [newVideoItem, ...element.extraAttributes.videos],
      },
    });
    setOpen(false);
  }

  return (
    <div className="border-b h-12 px-2 gap-2 flex items-center shrink-0">
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
                Add Video
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
      {/* <Button size="sm" variant="outline">
        <FileVideo2 className="w-4 h-4" />
        <span>Upload</span>
      </Button> */}
    </div>
  );
};

export default VideoToolbar;
