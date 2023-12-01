import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useBuilder from '../../hooks/useBuilder';
import { MoodboardElement } from './MoodboardBuilderElement';

const FormSchema = z.object({
  url: z.string().url(),
});

interface EmbedImagePopoverProps {
  element: MoodboardElement;
  children: React.ReactNode;
}

const EmbedImagePopover = ({ children, element }: EmbedImagePopoverProps) => {
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
        images: [{ url: data.url }, ...element.extraAttributes.images],
      },
    });
    form.reset();
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <p className="text-sm mb-2 font-medium">Add Image URL</p>
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

export default EmbedImagePopover;
