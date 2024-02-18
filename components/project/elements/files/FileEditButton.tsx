import { useProjectId } from '@/components/providers/ProjectProvider';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Prisma } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { MoreVertical, Trash } from 'lucide-react';
import { deleteFile } from './actions';

interface FileEditButtonProps extends ButtonProps {
  file: Prisma.FileGetPayload<{}>;
}

const FileEditButton = ({ file, className }: FileEditButtonProps) => {
  const queryClient = useQueryClient();
  const projectId = useProjectId();

  function handleFileDelete() {
    deleteFile(file.id);
    queryClient.invalidateQueries({ queryKey: ['files', projectId] });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="iconSmall" variant="ghost" className={className}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem>
          <Image className="mr-2 w-4 h-4" />
          <span>Change icon</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilLine className="mr-2 w-4 h-4" />
          <span>Rename</span>
        </DropdownMenuItem> */}

        <DropdownMenuItem onClick={handleFileDelete}>
          <Trash className="mr-2 w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileEditButton;
