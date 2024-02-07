import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useBuilder from '../../hooks/useBuilder';
import { MoodboardElement } from './MoodboardBuilderElement';

const formSchema = z.object({
  url: z.string().url(),
});

interface EmbedImageButtonProps {
  element: MoodboardElement;
}

const EmbedImageButton = ({ element }: EmbedImageButtonProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
    },
  });
  const { updateElement } = useBuilder();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
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
      <PopoverTrigger asChild>
        <Button size="s" variant="outline">
          <Link className="w-3 h-3" />
          Embed
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <p className="text-sm mb-2 font-medium">Add Image via URL</p>
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
                    placeholder="Enter image url..."
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

export default EmbedImageButton;
