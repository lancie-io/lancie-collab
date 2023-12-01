import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Image, MoreVertical, PencilLine, Trash } from 'lucide-react';

interface EditButtonProps extends ButtonProps {}

const EditButton = ({ className }: EditButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="iconSmall" variant="ghost" className={className}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Image className="mr-2 w-4 h-4" />
          <span>Change icon</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilLine className="mr-2 w-4 h-4" />
          <span>Rename</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Trash className="mr-2 w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditButton;
