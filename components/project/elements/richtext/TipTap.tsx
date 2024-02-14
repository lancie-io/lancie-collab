'use client';

import { cn } from '@/lib/utils';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BuilderElementInstance } from '../../BuilderElements';
import { useBuilder } from '../../BuilderProvider';
import { CustomInstance } from './RichtextBuilderElement';
import Toolbar from './Toolbar';

interface TipTapProps {
  elementInstance: BuilderElementInstance;
  isPreview: boolean;
}

const Tiptap = ({ elementInstance, isPreview }: TipTapProps) => {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useBuilder();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing…',
        emptyEditorClass:
          'tiptap-empty:first-child before:text-muted-foreground before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none p-4',
      },
      editable: () => !isPreview,
    },
    content: element.extraAttributes.content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          content: json,
        },
      });
      // send the content to an API here
    },
  });

  return (
    <div className={cn(isPreview && '')}>
      {editor && (
        <div>
          {!isPreview && <Toolbar editor={editor} />}
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
};

export default Tiptap;
