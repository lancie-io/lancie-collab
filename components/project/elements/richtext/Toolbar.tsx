import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import { BoldIcon, ItalicIcon } from 'lucide-react';
import { ToolbarHeadings } from './ToolbarHeadings';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="border-b p-1 w-full gap-1 flex items-center">
      <Button
        size="iconSmall"
        variant="outline"
        className={cn(editor.isActive('bold') && 'border-foreground')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </Button>
      <Button
        size="iconSmall"
        variant="outline"
        className={cn(editor.isActive('italic') && 'border-foreground')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Button>
      <ToolbarHeadings editor={editor} />
    </div>
  );
};

export default Toolbar;
