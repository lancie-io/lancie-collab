import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  placeholder?: string;
  content?: JSONContent;
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
      Placeholder.configure({
        placeholder: placeholder || 'Start writing…',
        emptyEditorClass:
          'tiptap-empty:first-child before:text-muted-foreground before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none p-5',
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
  return (
    <div>
      {editor && (
        <div>
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
};

export default Editor;
