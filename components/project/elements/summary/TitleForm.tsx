'use client';

import { useProjectId } from '@/components/providers/ProjectProvider';
import Title from '@/components/shared/Title';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getProjectTitle } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import debounce from 'lodash.debounce';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useBuilder } from '../../BuilderProvider';
import { useSettings } from './Summary';
import { SettingsCustomInstance } from './SummaryBuilderElement';

const formSchema = z.object({
  description: z.string().optional(),
  production: z.date().optional(),
  publishing: z.date().optional(),
});

const TitleForm = ({ element }: { element: SettingsCustomInstance }) => {
  const projectId = useProjectId();
  const { settings, setSettings } = useSettings();
  const { updateElement } = useBuilder();
  const { data: title, status } = useQuery({
    queryKey: ['title', projectId],
    queryFn: async () => {
      return await getProjectTitle(projectId);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: element.extraAttributes.description,
      production:
        element.extraAttributes.production &&
        new Date(element.extraAttributes.production),
      publishing:
        element.extraAttributes.publishing &&
        new Date(element.extraAttributes.publishing),
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    debouncedUpdate(values);
    toast.success(JSON.stringify(values, null, 2));
  }

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);
  const debouncedUpdate = debounce(updateSummary, 1000);
  function updateSummary(values: z.infer<typeof formSchema>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        description: values.description,
        production: values.production,
        publishing: values.publishing,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        {settings.title && <Title>{title}</Title>}
        {settings.description && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {(settings.production || settings.publishing) && (
          <div className="grid grid-cols-2 gap-6">
            {settings.production && (
              <FormField
                control={form.control}
                name="production"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Production Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {settings.publishing && (
              <FormField
                control={form.control}
                name="publishing"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publishing Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default TitleForm;
