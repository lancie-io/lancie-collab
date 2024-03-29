import { useView } from '@/components/providers/ViewProvider';
import { getPresenceColor } from '@/lib/utils';
import { Presence, UserMeta } from '@/liveblocks.config';
import { User } from '@liveblocks/client';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AnimatePresence } from 'framer-motion';
import { FocusEvent, useEffect, useState } from 'react';
import Toolbar from './Toolbar';

interface TipTapEditorProps {
  placeholder?: string;
  editable?: boolean;
  doc: any;
  provider: any;
  self: User<Presence, UserMeta> | null;
}

export function TiptapEditor({
  doc,
  provider,
  placeholder,
  editable = true,
  self,
}: TipTapEditorProps) {
  const { isView } = useView();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        history: false,
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
      // Register the Yjs document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: self?.info.name,
          color: self?.connectionId && getPresenceColor(self.connectionId),
          avatar: self?.info.avatar,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert focus:outline-none p-4 md:p-5 w-full h-full max-w-none',
      },

      editable: () => editable,
    },
  });
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);
  const [isActive, setIsActive] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <>
      {editor && (
        <div
          className="min-h-[200px]"
          onFocus={() => setIsActive(true)}
          onBlur={handleBlur}
          id="parent"
        >
          <AnimatePresence>
            {isActive && !isView && (
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
}
