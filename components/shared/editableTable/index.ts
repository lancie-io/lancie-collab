import { LiveObject, Room } from '@liveblocks/client';
import { nanoid } from 'nanoid';
import { SelectOption } from './columns';
import { ID_LENGTH } from './constants';
import {
  PresenceDataTable,
  StorageDataTable,
  UserMetaDataTable,
} from './liveblocks-datatable';
import { Column, Row } from './types';
import { extractCellId, getCellId, removeFromArray } from './utils';

export interface DataTable {
  insertRow(index: number): void;
  deleteRow(index: number): void;
  insertColumn(index: number): void;
  deleteColumn(index: number): void;
  onCellsChange(
    callback: (cells: Record<string, { value: any }>) => void
  ): () => void;
  onRowsChange(callback: (rows: Row[]) => void): () => void;
  onColumnsChange(callback: (columns: Column[]) => void): () => void;
  setCellValue(columnId: string, rowId: string, value: string): void;
  selectCell(columnId: string, rowId: string): void;
  getCellValue(columnId: string, rowId: string): any;
  updateColumnHeader(index: number, header: string): void;
  replaceColumn(index: number, type: string): void;
  addOptionToColumn(index: number, option: SelectOption): void;
}

export async function createDataTable(
  room: Room<PresenceDataTable, StorageDataTable, UserMetaDataTable, never>
): Promise<DataTable> {
  const { root } = await room.getStorage();
  const dataTable = root.get('dataTable');

  function insertColumn(index: number, type?: string) {
    const key = nanoid(ID_LENGTH);
    let newColumn: Column = {
      id: key,
      header: 'Text',
      type: 'text',
      accessorKey: key,
      cell: 'Cell Content',
      options: undefined,
    };

    if (type === 'number') {
      newColumn.header = 'Number';
      newColumn.type = 'number';
    }

    if (type === 'select') {
      newColumn.header = 'Select';
      newColumn.type = 'select';
      newColumn.options = [];
    }
    dataTable.get('columns').insert(new LiveObject(newColumn), index);
  }

  function insertRow(index: number) {
    dataTable
      .get('rows')
      .insert(new LiveObject({ id: nanoid(ID_LENGTH) }), index);
  }

  function getCellValue(columnId: string, rowId: string) {
    const cell = dataTable
      .get('cells')
      .get(getCellId(columnId, rowId))
      ?.get('value');
    return cell;
  }

  const rowsCallback: Array<(rows: Row[]) => void> = [];
  function onRowsChange(callback: (rows: Row[]) => void) {
    rowsCallback.push(callback);
    callback(dataTable.get('rows').map((row) => row.toObject()));
    return () => removeFromArray(rowsCallback, callback);
  }
  room.subscribe(
    dataTable.get('rows'),
    () => {
      const rows = dataTable.get('rows').map((row) => row.toObject());
      for (const callback of rowsCallback) {
        callback(rows);
      }
    },
    {
      isDeep: true,
    }
  );

  const columnsCallback: Array<(columns: Column[]) => void> = [];
  function onColumnsChange(callback: (columns: Column[]) => void) {
    columnsCallback.push(callback);
    callback(dataTable.get('columns').map((column) => column.toObject()));
    return () => removeFromArray(columnsCallback, callback);
  }
  room.subscribe(
    dataTable.get('columns'),
    () => {
      const columns = dataTable
        .get('columns')
        .map((column) => column.toObject());
      for (const callback of columnsCallback) {
        callback(columns);
      }
    },
    {
      isDeep: true,
    }
  );

  const cellCallbacks: Array<(cells: Record<string, { value: any }>) => void> =
    [];
  function onCellsChange(
    callback: (cells: Record<string, { value: any }>) => void
  ) {
    cellCallbacks.push(callback);
    const cells = Object.fromEntries(
      [...dataTable.get('cells').entries()].map(([key]) => [
        key,
        getCellValue(...extractCellId(key)),
      ])
    );
    callback(cells);
    return () => removeFromArray(cellCallbacks, callback);
  }
  room.subscribe(
    dataTable.get('cells'),
    () => {
      const cells = Object.fromEntries(
        [...dataTable.get('cells').entries()].map(([key]) => [
          key,
          getCellValue(...extractCellId(key)),
        ])
      );
      for (const callback of cellCallbacks) {
        callback(cells);
      }
    },
    { isDeep: true }
  );

  function innerClearColumn(index: number) {
    const column = dataTable.get('columns').get(index);

    for (const row of dataTable.get('rows').toArray()) {
      dataTable
        .get('cells')
        .delete(getCellId(column!.get('id'), row.get('id')));
    }
  }

  function innerClearRow(index: number) {
    const row = dataTable.get('rows').get(index);
    for (const column of dataTable.get('columns').toArray()) {
      dataTable
        .get('cells')
        .delete(getCellId(column.get('id'), row!.get('id')));
    }
  }

  function clearColumn(index: number) {
    room.batch(() => {
      innerClearColumn(index);
    });
  }

  function clearRow(index: number) {
    room.batch(() => {
      innerClearRow(index);
    });
  }

  function deleteColumn(index: number) {
    room.batch(() => {
      innerClearColumn(index);
      dataTable.get('columns').delete(index);
    });
  }

  function deleteRow(index: number) {
    room.batch(() => {
      innerClearRow(index);
      dataTable.get('rows').delete(index);
    });
  }

  function setCellValue(columnId: string, rowId: string, value: string) {
    const cells = dataTable.get('cells');

    const cellId = getCellId(columnId, rowId);
    const cell = cells.get(cellId);

    if (cell == null) {
      cells.set(cellId, new LiveObject({ value }));
    } else {
      cell.set('value', value);
    }
  }

  function updateColumnHeader(index: number, header: string) {
    console.log(index, header);
    dataTable.get('columns').get(index)?.set('header', header);
  }

  function selectCell(columnId: string, rowId: string) {
    room.updatePresence({
      selectedCell: columnId && rowId ? getCellId(columnId, rowId) : null,
    });
  }

  function replaceColumn(index: number, type: string) {
    console.log('replacing');
    deleteColumn(index);
    console.log('deleted');
    insertColumn(index, type);
  }

  function addOptionToColumn(index: number, option: SelectOption) {
    const column = dataTable.get('columns').get(index);
    const options = column?.get('options');
    column?.set('options', options?.concat([option]));
  }

  return {
    insertRow,
    deleteRow,
    insertColumn,
    deleteColumn,
    onCellsChange,
    onRowsChange,
    onColumnsChange,
    setCellValue,
    selectCell,
    getCellValue,
    updateColumnHeader,
    replaceColumn,
    addOptionToColumn,
  };
}
