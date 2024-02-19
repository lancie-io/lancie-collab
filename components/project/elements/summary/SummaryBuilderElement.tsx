'use client';

import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLiveblocks } from '@/lib/liveblocks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import Summary from './Summary';

const type: ElementType = 'summary';

const extraAttributes = {
  label: 'Summary',
  helperText: 'This is a summary element',
  required: false,
  placeholder: 'Enter text here',
  content: '',
  settings: {
    title: true,
    description: true,
    cover: true,
    production: true,
    publishing: true,
  },
  description: '',
  production: undefined,
  publishing: undefined,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
});

export const SummaryBuilderElement: BuilderElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  buttonComponent: {
    icon: 'Sparkle',
    label: 'Summary',
  },

  builderComponent: BuilderComponent,
  previewComponent: PreviewComponent,
  propertiesComponent: PropertiesComponent,
};

export type SettingsCustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as SettingsCustomInstance;
  const { updateElement } = useLiveblocks();
  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
    },
  });

  useEffect(() => {
    form.reset({
      label: element.extraAttributes.label,
    });
  }, [element, form]);

  function applyChanges(values: z.infer<typeof propertiesSchema>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        label: values.label,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Input
                {...field}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function BuilderComponent({
  elementInstance,
  isPreview = false,
}: {
  elementInstance: BuilderElementInstance;
  isPreview?: boolean;
}) {
  const element = elementInstance as SettingsCustomInstance;
  return <Summary element={element} />;
}

export function PreviewComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as SettingsCustomInstance;
  return <BuilderComponent elementInstance={element} isPreview={true} />;
}
