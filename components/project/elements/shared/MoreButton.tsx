'use client';
import { useView } from '@/components/providers/ViewProvider';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLiveblocks } from '@/lib/liveblocks';
import { cn } from '@/lib/utils';
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowDownToLine,
  ArrowUpToLine,
  MoreVertical,
  Trash,
} from 'lucide-react';
import { BuilderElementInstance } from '../../BuilderElements';

interface MoreButtonProps extends ButtonProps {
  element: BuilderElementInstance;
}

const MoreButton = ({ className, element }: MoreButtonProps) => {
  const { id } = element;
  const {
    moveElementDown,
    moveElementUp,
    moveElementFirst,
    moveElementLast,
    removeElement,
    isFirst,
    isLast,
  } = useLiveblocks();

  const { isView } = useView();
  if (isView) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="iconSmall" variant="ghost" className={cn(className)}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          disabled={isFirst(id)}
          onClick={() => moveElementUp(id)}
        >
          <ArrowBigUp className="mr-2 h-4 w-4" />
          <span>Move Up</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isLast(id)}
          onClick={() => moveElementDown(id)}
        >
          <ArrowBigDown className="mr-2 h-4 w-4" />
          <span>Move Down</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isFirst(id)}
          onClick={() => moveElementFirst(id)}
        >
          <ArrowUpToLine className="mr-2 h-4 w-4" />
          <span>To Top</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isLast(id)}
          onClick={() => moveElementLast(id)}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          <span>To Bottom</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => removeElement(id)}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;
