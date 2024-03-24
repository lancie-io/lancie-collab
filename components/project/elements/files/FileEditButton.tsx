import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Prisma } from '@prisma/client';
import { MoreVertical, PencilLine, Trash } from 'lucide-react';
import { useState } from 'react';
import RenameForm from './RenameForm';
import useFiles from './useFiles';

interface FileEditButtonProps extends ButtonProps {
  file: Prisma.FileGetPayload<{}>;
}

const FileEditButton = ({ file, className }: FileEditButtonProps) => {
  const { deleteFile } = useFiles();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="iconSmall" variant="ghost" className={className}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent id="popover-content">
        {/* <DropdownMenuItem>
          <Image className="mr-2 w-4 h-4" />
          <span>Change icon</span>
        </DropdownMenuItem> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PencilLine className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="p-3" id="popover-content">
              <RenameForm
                setOpen={setOpen}
                fileId={file.id}
                name={file.label || file.name}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => deleteFile(file.id)}>
          <Trash className="mr-2 w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileEditButton;
