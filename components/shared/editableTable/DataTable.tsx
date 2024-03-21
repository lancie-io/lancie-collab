'use client';

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useView } from '@/components/providers/ViewProvider';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useOthers, useSelf } from '@/liveblocks.config';
import { AnyARecord } from 'dns';
import { Plus, Trash } from 'lucide-react';
import DataTableHead from './DataTableHead';
import WrapperCell from './WrapperCell';
import EmptyTableState from './components/EmptyTableState';
import { useDataTable } from './react';
import { Row } from './types';
import { getCellId } from './utils';

interface DataTableProps<TData, TValue> {
  // onUpdate?: ({
  //   newColumns,
  //   newData,
  // }: {
  //   newColumns: ColumnDef<TData, TValue>[];
  //   newData: TData[];
  // }) => void;
}

export type TableMetaType<TData, TValue> = {
  updateData: (rowIndex: number, columnId: string, value: AnyARecord) => void;
  addColumn: () => void;
  removeColumn: (columnIndex: number) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  updateColumn: (columnIndex: number, column: ColumnDef<TData, TValue>) => void;
  switchColumn: (columnIndex: number, type: string) => void;
  updateColumnHeader: (columnIndex: number, value: string) => void;
  type: string;
};

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { isView } = useView();
  const dataTable = useDataTable();
  const {
    users,
    others,
    selection,
    selectCell,
    cells,
    rows = [],
    columns = [],
    setCellValue,
    insertRow,
    deleteRow,
    insertColumn,
    deleteColumn,
    updateColumnHeader,
    replaceColumn,
    addOptionToColumn,
  } = dataTable || {};
  const self = useSelf();
  const globalOthers = useOthers();

  const table = useReactTable({
    data: rows as TData[],
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
  });

  if (!dataTable) {
    return (
      <div>
        <div className="grid grid-cols-3 gap-3 p-3">
          <div className="flex gap-1.5">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    );
  }
  console.log('dt rendered');

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <DataTableHead
                    header={header}
                    updateColumnHeader={updateColumnHeader}
                    replaceColumn={replaceColumn}
                    key={header.id}
                    deleteColumn={deleteColumn}
                  />
                );
              })}
              {!isView && (
                <TableHead onClick={() => insertColumn?.(columns.length)}>
                  <Plus className="w-4 h-4" />
                </TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell, index) => {
                  const originalRow = cell.row.original as Row;
                  const id = getCellId(cell.column.id, originalRow.id);
                  const value = cells?.[id];
                  const columnId = cell.column.id;
                  const rowId = originalRow.id;

                  const isSelected =
                    selection?.columnId === columnId &&
                    selection?.rowId === rowId;
                  return (
                    <TableCell
                      className="p-0 h-14"
                      key={cell.id}
                      id={`wrapper-cell`}
                    >
                      <WrapperCell
                        isSelected={isSelected}
                        value={value}
                        selection={selection}
                        selectCell={selectCell}
                        setCellValue={setCellValue}
                        addOptionToColumn={addOptionToColumn}
                        other={others?.[id]}
                        {...cell.getContext()}
                      />
                    </TableCell>
                  );
                })}
                {!isView && (
                  <TableCell>
                    <Trash
                      className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => deleteRow?.(row.index)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <EmptyTableState
              colSpan={table.getCenterLeafColumns().length + 1}
            />
          )}
        </TableBody>
        {!isView && (
          <TableFooter>
            <TableRow>
              <TableHead colSpan={table.getCenterLeafColumns().length + 1}>
                <div
                  onClick={() => insertRow?.(rows.length)}
                  className="text-sm cursor-pointer text-muted-foreground hover:text-foreground flex gap-1.5 items-center"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </div>
              </TableHead>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
