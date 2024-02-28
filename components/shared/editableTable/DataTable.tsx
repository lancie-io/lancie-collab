'use client';

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { idGenerator } from '@/lib/utils';
import { AnyARecord } from 'dns';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import DataTableHead from './DataTableHead';
import WrapperCell from './WrapperCell';
import { ColumnType, generateColumn } from './helpers';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
  updateHeaderValue: (columnIndex: number, value: string) => void;
  type: string;
};

export function DataTable<TData, TValue>({
  columns: defaultColumns,
  data: defaultData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(defaultData);
  const [columns, setColumns] = useState(defaultColumns);

  // const updateColumns = (
  //   setFunc: (old: ColumnDef<TData, TValue>[]) => ColumnDef<TData, TValue>[]
  // ) => {
  //   if (onUpdate) {
  //     onUpdate({
  //       newColumns: setFunc(columns),
  //       newData: data,
  //     });
  //   } else {
  //     setColumns(setFunc);
  //   }
  // };

  // const updateData = (newData: TData[]) => {
  //   if (onUpdate) {
  //     onUpdate({
  //       newColumns: columns,
  //       newData,
  //     });
  //   } else {
  //     setData(newData);
  //   }
  // };

  const colHelper = createColumnHelper<any>();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        const setFunc = (old: TData[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          });

        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        });
        // updateData(newData);
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      updateColumn: (columnIndex: number, column: ColumnDef<TData, TValue>) => {
        const setFunc = (old: ColumnDef<TData, TValue>[]) => {
          const newColumns = [...old];
          newColumns[columnIndex] = column;
          return newColumns;
        };
        // updateColumns(setFunc);
        setColumns(setFunc);
      },
      updateHeaderValue: (columnIndex: number, value: string) => {
        const setFunc = (old: ColumnDef<TData, TValue>[]) => {
          const newColumns = [...old];
          newColumns[columnIndex].header = value;
          return newColumns;
        };
        // updateColumns(setFunc);
        setColumns(setFunc);
      },
      addColumn: () => {
        const newColumn: any = colHelper.accessor(idGenerator(), {
          header: 'Text',
          cell: WrapperCell,
          meta: {
            type: 'text',
          },
        });
        const setFunc = (old: ColumnDef<TData, TValue>[]) => [
          ...old,
          newColumn,
        ];
        // updateColumns(setFunc);
        setColumns(setFunc);
      },
      switchColumn: (columnIndex: number, type: string) => {
        // @ts-ignore
        const oldColId = columns[columnIndex].accessorKey;
        console.log('oldcolid', oldColId);
        //go through all rows and filter for all values that are not the old column
        const newRows = data.map((row: any) => {
          const newRow = {
            ...row,
          };
          delete newRow[oldColId];
          return newRow;
        });

        console.log('newRows', newRows);

        // console.log('oldcolid', oldColId);
        // const newData = [] as TData[];
        setData(() => [...newRows]);

        const newColumn: any = generateColumn(type as ColumnType);
        const setFunc = (old: ColumnDef<TData, TValue>[]) => {
          const newColumns = [...old];
          newColumns[columnIndex] = newColumn;
          return newColumns;
        };
        setColumns(setFunc);
      },
      removeColumn: (columnIndex: number) => {
        const setFilterFunc = (old: ColumnDef<TData, TValue>[]) =>
          old.filter(
            (_column: ColumnDef<TData, TValue>, index: number) =>
              index !== columnIndex
          );
        // updateColumns(setFilterFunc);
        setColumns(setFilterFunc);
      },
      addRow: () => {
        //to ChatGPT: I here want to create a newRow with the properties of the passed object in the columns array
        const newRow = {} as TData;
        const setFunc = (old: TData[]) => [...old, newRow];
        const newData = [
          ...data,
          {
            name: 'Lukas',
            role: 'Director',
            phone: '123',
          },
        ];
        // updateData(newData);
        setData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: TData[]) =>
          old.filter((_row: TData, index: number) => index !== rowIndex);

        const newData = data.filter(
          (_row: TData, index: number) => index !== rowIndex
        );
        // updateData(newData);
        setData(setFilterFunc);
      },
    },
  });

  const meta = table.options.meta as TableMetaType<TData, TValue>;

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <DataTableHead
                    tableMeta={meta}
                    header={header}
                    key={header.id}
                  />
                );
              })}
              {/* @ts-ignore */}
              <TableHead onClick={meta.addColumn}>
                <Plus className="w-4 h-4" />
              </TableHead>
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
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell className="p-0 h-14" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Trash
                    className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => meta.removeRow(row.index)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan={table.getCenterLeafColumns().length + 1}>
              <div
                onClick={meta.addRow}
                className="text-sm cursor-pointer text-muted-foreground hover:text-foreground flex gap-1.5 items-center"
              >
                <Plus className="w-3 h-3" />
                Add
              </div>
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
