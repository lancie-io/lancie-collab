import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Image, MoreVertical, PencilLine, Trash } from 'lucide-react';
import { useBuilder } from '../../BuilderProvider';
import { File, FilesElement } from './FilesBuilderElement';

interface EditButtonProps extends ButtonProps {
  file: File;
  element: FilesElement;
}

const EditButton = ({ file, element, className }: EditButtonProps) => {
  const { updateElement } = useBuilder();
  function removeFile(fileUrl: string) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        files: element.extraAttributes.files.filter(
          (file: File) => file.url !== fileUrl
        ),
      },
    });
  }
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

        <DropdownMenuItem onClick={() => removeFile(file.url)}>
          <Trash className="mr-2 w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditButton;
