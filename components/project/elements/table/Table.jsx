import {
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@/components/ui/table';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import Cell from './cells/Cell';
import Header from './header/Header';
import { ActionTypes } from './utils';

const defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell: Cell,
  Header: Header,
  sortType: 'alphanumericFalsyLast',
};

export default function Table({
  columns,
  data,
  dispatch: dataDispatch,
  skipReset,
  isPreview,
}) {
  const sortTypes = useMemo(
    () => ({
      alphanumericFalsyLast(rowA, rowB, columnId, desc) {
        if (!rowA.values[columnId] && !rowB.values[columnId]) {
          return 0;
        }

        if (!rowA.values[columnId]) {
          return desc ? -1 : 1;
        }

        if (!rowB.values[columnId]) {
          return desc ? 1 : -1;
        }

        return isNaN(rowA.values[columnId])
          ? rowA.values[columnId].localeCompare(rowB.values[columnId])
          : rowA.values[columnId] - rowB.values[columnId];
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      dataDispatch,
      autoResetSortBy: !skipReset,
      autoResetFilters: !skipReset,
      autoResetRowState: !skipReset,
      sortTypes,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy
  );

  const renderRows = React.useCallback(() => {
    return rows.map((row) => {
      prepareRow(row);
      return (
        <TableRow
          key={JSON.stringify(row)}
          {...row.getRowProps()}
          style={{
            minWidth: '100%',
          }}
        >
          {row.cells.map((cell, index) => {
            if (index == row.cells.length - 1 && isPreview) {
              return;
            }
            return (
              <TableCell
                key={JSON.stringify(cell)}
                className="p-0"
                {...cell.getCellProps()}
              >
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  }, [prepareRow, rows]);

  function isTableResizing() {
    for (let headerGroup of headerGroups) {
      for (let column of headerGroup.headers) {
        if (column.isResizing) {
          return true;
        }
      }
    }

    return false;
  }

  return (
    <div className="overflow-auto">
      <UITable
        {...getTableProps()}
        className={clsx(isTableResizing() && 'noselect')}
      >
        <TableHeader>
          {headerGroups.map((headerGroup, idx) => (
            <TableRow
              key={idx}
              style={{
                minWidth: '100%',
              }}
              {...headerGroup.getHeaderGroupProps()}
              className="border-b-0"
            >
              {headerGroup.headers.map((column, index) => {
                if (index == headerGroup.headers.length - 1 && isPreview) {
                  return;
                }
                return column.render('Header');
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-t" {...getTableBodyProps()}>
          {renderRows()}
        </TableBody>
        {!isPreview && (
          <div
            className="flex items-center gap-1.5 text-sm text-muted-foreground h-10 px-4 cursor-pointer border-t hover:bg-accent/50"
            onClick={() => dataDispatch({ type: ActionTypes.ADD_ROW })}
          >
            <Plus className="w-4 h-4" />
            New
          </div>
        )}
      </UITable>
    </div>
  );
}
