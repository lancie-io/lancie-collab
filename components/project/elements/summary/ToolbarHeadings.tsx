'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';

const headings = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
];

interface ToolbarHeadingsProps {
  editor: Editor;
}

export function ToolbarHeadings({ editor }: ToolbarHeadingsProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(getCurrentHeading(editor));

  React.useEffect(() => {
    onHeadingChange(value);
  }, [value]);

  const onHeadingChange = React.useCallback(
    (value: string) => {
      if (!editor) {
        return;
      }

      switch (value) {
        case 'p':
          editor.chain().focus().setParagraph().run();
          break;

        case 'h1':
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;

        case 'h2':
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;

        case 'h3':
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;
      }
    },
    [editor]
  );

  function getCurrentHeading(editor: Editor) {
    if (editor.isActive('heading', { level: 1 })) {
      return 'h1';
    }

    if (editor.isActive('heading', { level: 2 })) {
      return 'h2';
    }

    if (editor.isActive('heading', { level: 3 })) {
      return 'h3';
    }

    return 'p';
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between h-8"
        >
          {value
            ? headings.find((heading) => heading.value === value)?.label
            : 'Select text type...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {headings.map((heading) => (
              <CommandItem
                key={heading.value}
                value={heading.value}
                onSelect={(currentValue: any) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === heading.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {heading.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
