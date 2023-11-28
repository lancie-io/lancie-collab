'use client';

import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  BuilderElement,
  BuilderElementInstance,
  ElementType,
} from '../../BuilderElements';
import useBuilder from '../../hooks/useBuilder';
import Editor from './Editor';

const type: ElementType = 'summary';

const extraAttributes = {
  label: 'Text',
  helperText: 'This is a text element',
  required: false,
  placeholder: 'Enter text here',
  content: '',
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
    icon: Pen,
    label: 'Summary',
  },

  builderComponent: BuilderComponent,
  previewComponent: () => <div>Text Preview Component</div>,
  propertiesComponent: PropertiesComponent,
};

export type CustomInstance = BuilderElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useBuilder();
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
}: {
  elementInstance: BuilderElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="w-full bg-background min-h-[120px]">
      <Editor elementInstance={element} />
    </div>
  );
}
