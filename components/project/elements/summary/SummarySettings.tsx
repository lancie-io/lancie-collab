import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSettings } from './Summary';

const formSchema = z.object({
  title: z.boolean(),
  description: z.boolean(),
  cover: z.boolean(),
  production: z.boolean(),
  publishing: z.boolean(),
});

const SummarySettings = () => {
  const { settings, setSettings } = useSettings();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: settings.title,
      description: settings.description,
      cover: settings.cover,
      production: settings.production,
      publishing: settings.publishing,
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSettings(values);
    toast.success(JSON.stringify(values, null, 2));
  }

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="sm">
          <Settings2 className="w-4 h-4" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Summary Settings</SheetTitle>
          <SheetDescription>Customize your board summary.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="divide-y">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center space-y-0 py-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Switch
                      className="shrink-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center space-y-0 py-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Switch
                      className="shrink-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center space-y-0 py-4">
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Switch
                      className="shrink-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="production"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center space-y-0 py-4">
                  <FormLabel>Production Date</FormLabel>
                  <FormControl>
                    <Switch
                      className="shrink-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishing"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center space-y-0 py-4">
                  <FormLabel>Publishing Date</FormLabel>
                  <FormControl>
                    <Switch
                      className="shrink-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SummarySettings;
