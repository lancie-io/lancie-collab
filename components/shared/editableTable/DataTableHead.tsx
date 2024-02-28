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
import { Header, flexRender } from '@tanstack/react-table';
import { AlignLeft, Check, ChevronDownCircle, Hash, Trash } from 'lucide-react';
import { useState } from 'react';
import LucideIcon from '../LucideIcon';
import ControlledInput from './ControlledInput';
import { TableMetaType } from './DataTable';
import { ColumnMeta } from './columns';
import { ColumnType } from './helpers';

interface DataTableHeadProps<TData, TValue> {
  header: Header<TData, TValue>;
  tableMeta: TableMetaType<TData, TValue>;
}

const DataTableHead = <TData, TValue>({
  header,
  tableMeta: meta,
}: DataTableHeadProps<TData, TValue>) => {
  const { type } = header.column.columnDef.meta as ColumnMeta;
  const [open, setOpen] = useState(false);
  return (
    <TableHead className="p-0" key={header.id}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="w-full h-full text-left px-4 flex items-center">
          <ColumnIcon type={type} className="mr-2 w-4 h-4" />
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
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
                meta.updateHeaderValue(
                  header.column.getIndex(),
                  e.target.value
                );
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
              <DropdownMenuSubContent className="w-[180px]">
                <DropdownMenuItem
                  onClick={() =>
                    meta.switchColumn(header.column.getIndex(), 'text')
                  }
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
                  onClick={() =>
                    meta.switchColumn(header.column.getIndex(), 'select')
                  }
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
                  onClick={() =>
                    meta.switchColumn(header.column.getIndex(), 'number')
                  }
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
          <DropdownMenuItem
            onClick={() => meta.removeColumn(header.column.getIndex())}
          >
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
  type: ColumnType;
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
