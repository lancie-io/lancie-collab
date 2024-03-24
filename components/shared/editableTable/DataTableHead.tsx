import { useView } from '@/components/providers/ViewProvider';
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
import { TableHead } from '@/components/ui/table';
import { capitalize, cn } from '@/lib/utils';
import { ColumnDef, Header, flexRender } from '@tanstack/react-table';
import { AlignLeft, Check, ChevronDownCircle, Hash, Trash } from 'lucide-react';
import { useState } from 'react';
import LucideIcon from '../LucideIcon';
import ControlledInput from './ControlledInput';
import { ReactDataTable } from './react';
import { Column } from './types';

interface DataTableHeadProps<TData, TValue> {
  header: Header<TData, TValue>;
  deleteColumn?: (columnIndex: number) => void;
  updateColumnHeader?: ReactDataTable['updateColumnHeader'];
  replaceColumn?: ReactDataTable['replaceColumn'];
}

const DataTableHead = <TData, TValue>({
  header,
  deleteColumn,
  updateColumnHeader,
  replaceColumn,
}: DataTableHeadProps<TData, TValue>) => {
  const [open, setOpen] = useState(false);
  const columnIndex = header.column.getIndex();
  const column = header.column.columnDef as ColumnDef<TData, TValue> & Column;
  const type = column.type;
  const { isView } = useView();

  const renderHeader = () => (
    <button className="w-full h-full text-left px-4 flex items-center">
      <ColumnIcon type={type} className="mr-2 w-4 h-4" />
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </button>
  );
  if (isView) {
    return (
      <TableHead className="p-0" key={header.id}>
        {renderHeader()}
      </TableHead>
    );
  }

  return (
    <TableHead className="p-0" key={header.id}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{renderHeader()}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]" id="popover-content">
          <div className="px-2 py-1.5">
            <ControlledInput
              autoFocus
              onBlur={(e) => {
                if (!e.target.value) {
                  return;
                }
                if (e.target.value === header.column.columnDef.header) {
                  return;
                }
                updateColumnHeader?.(columnIndex, e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                  setOpen(false);
                }
              }}
              initialValue={header.column.columnDef.header as string}
            />
          </div>
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            
          </DropdownMenuItem> */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ColumnIcon type={type} className="mr-2 w-4 h-4" />
              <span>{capitalize(type)}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className="w-[180px]"
                id="popover-content"
              >
                <DropdownMenuItem
                  onClick={() => replaceColumn?.(columnIndex, 'text')}
                >
                  <AlignLeft className="mr-2 h-4 w-4" />
                  <span>Text</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      type === 'text' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => replaceColumn?.(columnIndex, 'select')}
                >
                  <ChevronDownCircle className="mr-2 h-4 w-4" />
                  <span>Select</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      type === 'select' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => replaceColumn?.(columnIndex, 'number')}
                >
                  <Hash className="mr-2 h-4 w-4" />
                  <span>Number</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      type === 'number' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={() => deleteColumn?.(columnIndex)}>
            <Trash className="mr-2 w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
};

export default DataTableHead;

interface ColumnIconProps {
  type: string;
  className?: string;
}

const ColumnIcon = ({ className, type, ...props }: ColumnIconProps) => {
  return (
    <LucideIcon
      name={
        type === 'select'
          ? 'ChevronDownCircle'
          : type === 'number'
          ? 'Hash'
          : 'AlignLeft'
      }
      className={cn('w-4 h-4', className)}
      {...props}
    />
  );
};
