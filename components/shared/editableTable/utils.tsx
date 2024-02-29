import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { nanoid } from 'nanoid';
import { ID_LENGTH } from './constants';
import { StorageDataTable } from './liveblocks-datatable';
import { Cell, Column, Row } from './types';

export function removeFromArray<T>(array: T[], item: T): void {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      array.splice(i, 1);
      return;
    }
  }
}

export function createInitialStorage({
  initialColumns,
  initialRows,
}: {
  initialColumns: Column[];
  initialRows: any[];
}): StorageDataTable {
  const initialLiveColumns = initialColumns.map((column) => {
    const newColumn: Column = {
      id: column.id,
      header: column.header,
      type: column.type,
      accessorKey: column.accessorKey,
      options: column.options || [],
    };
    return new LiveObject(newColumn);
  });
  const initialLiveRows = initialRows.map((row) => {
    const newRow: Row = {
      id: row.id,
    };
    return new LiveObject(newRow);
  });
  //for every row and column create a cell
  const initialCells = initialLiveRows.flatMap((row) => {
    const rowId = row.get('id');
    return initialLiveColumns.map((column) => {
      const columnId = column.get('id');
      return [
        getCellId(columnId, rowId),
        new LiveObject({
          value: initialRows.find((r) => r.id === rowId)?.[columnId] || '',
        }),
      ] as readonly [string, LiveObject<Cell>];
    });
  });

  return {
    dataTable: new LiveObject({
      cells: new LiveMap<string, LiveObject<Cell>>(initialCells),
      columns: new LiveList<LiveObject<Column>>(initialLiveColumns),
      rows: new LiveList<LiveObject<Row>>(initialLiveRows),
    }),
  };
}

export function getCellId(columnId: string, rowId: string) {
  return `${columnId}${rowId}`;
}

export function extractCellId(cellId: string) {
  const columnId = cellId.slice(0, Math.max(0, cellId.length / 2));
  const rowId = cellId.slice(Math.max(0, cellId.length / 2));

  return [columnId, rowId] as [string, string];
}

export function generateNewColumn() {
  const newColumn = {
    id: nanoid(ID_LENGTH),
    header: 'Text',
    type: 'text',
  };
  return;
}
