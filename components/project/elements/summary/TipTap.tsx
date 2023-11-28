'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BuilderElementInstance } from '../../BuilderElements';
import useBuilder from '../../hooks/useBuilder';
import { CustomInstance } from './SummaryBuilderElement';
import Toolbar from './Toolbar';

const Tiptap = ({
  elementInstance,
}: {
  elementInstance: BuilderElementInstance;
}) => {
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
    <div>
      {editor && (
        <div>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
};

export default Tiptap;
