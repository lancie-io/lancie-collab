import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AnimatePresence } from 'framer-motion';
import { FocusEvent, useState } from 'react';
import Toolbar from './Toolbar';

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  json?: JSONContent;
  onUpdate?: (content: JSONContent) => void;
  editable?: boolean;
}

const Editor = ({
  placeholder,
  content,
  onUpdate,
  editable = true,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-400/30 text-foreground',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing…',
        emptyEditorClass:
          'tiptap-empty:first-child before:text-muted-foreground before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none p-5 w-full h-full',
      },

      editable: () => editable,
    },
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onUpdate?.(json);
      // send the content to an API here
    },
  });
  const [isActive, setIsActive] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <>
      {editor && (
        <div onFocus={() => setIsActive(true)} onBlur={handleBlur} id="parent">
          <AnimatePresence>
            {isActive && (
              <div className="absolute -translate-y-[75%] left-1/2 -translate-x-1/2">
                <Toolbar
                  className="bg-background shadow-2xl border rounded-md overflow-hidden"
                  editor={editor}
                  tabIndex={0}
                  key="toolbar"
                />
              </div>
            )}
          </AnimatePresence>
          <EditorContent className="w-full h-full relative" editor={editor} />
        </div>
      )}
    </>
  );
};

export default Editor;
