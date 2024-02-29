import { useCallback, useEffect, useState } from 'react';
import { DataTable, createDataTable } from '.';
import { useRoomDataTable } from './liveblocks-datatable';
import { CellAddress, Column, Row } from './types';

export interface ReactDataTable {
  cells: Record<string, { value: any }>;
  insertColumn(index: number): void;
  deleteColumn(index: number): void;
  insertRow(index: number): void;
  deleteRow(index: number): void;
  selectCell: DataTable['selectCell'];
  selection: CellAddress | null;
  setCellValue: DataTable['setCellValue'];
  updateColumnHeader: DataTable['updateColumnHeader'];
  replaceColumn: DataTable['replaceColumn'];
  addOptionToColumn: DataTable['addOptionToColumn'];
  rows: Row[];
  columns: Column[];
}

export function useDataTable(): ReactDataTable | null {
  const room = useRoomDataTable();
  const [dataTable, setDataTable] = useState<DataTable | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [cells, setCells] = useState<Record<string, { value: any }>>({});
  const [columns, setColumns] = useState<Column[]>([]);
  const [selection, setSelection] = useState<CellAddress | null>(null);

  const selectCell = useCallback(
    (columnId: string, rowId: string) => {
      setSelection({ columnId, rowId });
      dataTable?.selectCell(columnId, rowId);
    },
    [dataTable]
  );

  useEffect(() => {
    createDataTable(room).then((dataTable) => {
      dataTable.onRowsChange(setRows);
      dataTable.onColumnsChange(setColumns);
      dataTable.onCellsChange(setCells);
      setDataTable(dataTable);
    });
  }, [room]);

  useEffect(() => {
    if (!selection && columns.length > 0 && rows.length > 0) {
      selectCell(columns[0].id, rows[0].id);
    }
  }, [columns, rows, selection, selectCell]);

  return dataTable !== null
    ? {
        insertRow: dataTable.insertRow,
        deleteRow: dataTable.deleteRow,
        insertColumn: dataTable.insertColumn,
        deleteColumn: dataTable.deleteColumn,
        setCellValue: dataTable.setCellValue,
        updateColumnHeader: dataTable.updateColumnHeader,
        replaceColumn: dataTable.replaceColumn,
        addOptionToColumn: dataTable.addOptionToColumn,
        selectCell: selectCell,
        selection,
        rows,
        columns,
        cells,
      }
    : null;
}
