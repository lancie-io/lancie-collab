'use client';

import Avatar from '@/components/shared/Avatar';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type PersonT = {
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  persons: z.array(
    z.object({ name: z.string(), role: z.string(), image: z.string() })
  ),
});

const SummaryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      creator: undefined,
      persons: [
        {
          name: 'Lukas Hoppe',
          role: 'Camera',
          image:
            'https://uplift-images.s3.amazonaws.com/experiments/1707309048-lukas_dark_new-min.jpg',
        },
        {
          name: 'Niek',
          role: 'Producer',
          image:
            'https://img.limburger.nl/3tD2qWM6BkVTS4Mb3qEwuEJKfTU=/960x640/smart/https%3A%2F%2Fstatic.limburger.nl%2FAssets%2FImages_Upload%2F2020%2F03%2F30%2F6c68de48-726e-11ea-8ceb-2aca2f204717_web_scale_0.6179775_0.6179775__.jpg',
        },
        {
          name: 'Amelie',
          role: 'Drone Pilot',
          image:
            'https://res.cloudinary.com/du3mz9iny/image/upload/v1707499582/Screenshot_2024-02-09_at_18.26.04_sckhib.png',
        },
      ],
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Title</FormLabel>
              <FormControl>
                <Input
                  className="border-none focus-visible:ring-transparent pl-0 text-2xl font-semibold bg-transparent"
                  placeholder="Enter project title..."
                  {...field}
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
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="border-none focus-visible:ring-transparent pl-0 text-lg font-normal bg-transparent"
                  placeholder="Enter description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="persons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <div className="flex justify-start gap-4">
                  {field?.value?.map((person, index) => (
                    <Person key={index} person={person} />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SummaryForm;

const Person = ({ person }: { person: PersonT }) => {
  return (
    <div className="border border-foreground/20 rounded-md flex flex-col items-center gap-2 p-4">
      <Avatar user={person} className="w-16 h-16" />
      <span className="font-medium">{person.name}</span>
      <Badge>{person.role}</Badge>
    </div>
  );
};
