import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import {
  BoldIcon,
  Highlighter,
  ItalicIcon,
  List,
  ListOrdered,
} from 'lucide-react';
import { ToolbarHeadings } from './ToolbarHeadings';

interface ToolbarProps extends HTMLMotionProps<'div'> {
  editor: Editor;
}

const Toolbar = ({ editor, className, ...props }: ToolbarProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className={cn('divide-x flex items-center', className)}
      {...props}
    >
      <Button
        size="iconSmall"
        variant="none"
        className={cn(
          'rounded-none',
          editor.isActive('bold') && 'bg-foreground text-background'
        )}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </Button>
      <Button
        size="iconSmall"
        variant="none"
        className={cn(
          'rounded-none',
          editor.isActive('italic') && 'bg-foreground text-background'
        )}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Button>
      <ToolbarHeadings editor={editor} />
      <Button
        size="iconSmall"
        variant="none"
        className={cn(
          'rounded-none',
          editor.isActive('bulletList') && 'bg-foreground text-background'
        )}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        aria-label="BulletList"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        size="iconSmall"
        variant="none"
        className={cn(
          'rounded-none',
          editor.isActive('orderedList') && 'bg-foreground text-background'
        )}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        aria-label="OrderedList"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        size="iconSmall"
        variant="none"
        className={cn(
          'rounded-none',
          editor.isActive('highlight') && 'bg-foreground text-background'
        )}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        aria-label="Highlight"
      >
        <Highlighter className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default Toolbar;
