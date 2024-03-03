import { useOthers } from '@/liveblocks.config';
import { User } from '@liveblocks/client';
import { useCallback, useEffect, useState } from 'react';
import { DataTable, createDataTable } from '.';
import {
  PresenceDataTable,
  UserInfoDataTable,
  UserMetaDataTable,
  useRoomDataTable,
} from './liveblocks-datatable';
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
  users: readonly User<PresenceDataTable, UserMetaDataTable>[];
  others: Record<string, UserInfoDataTable>;
}

export function useDataTable(): ReactDataTable | null {
  const room = useRoomDataTable();
  const [dataTable, setDataTable] = useState<DataTable | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [cells, setCells] = useState<Record<string, { value: any }>>({});
  const [columns, setColumns] = useState<Column[]>([]);
  const [selection, setSelection] = useState<CellAddress | null>(null);
  const [users, setUsers] = useState<
    readonly User<PresenceDataTable, UserMetaDataTable>[]
  >([]);
  const [others, setOthers] = useState<Record<string, UserInfoDataTable>>({});

  const selectCell = useCallback(
    (columnId: string, rowId: string) => {
      setSelection({ columnId, rowId });
      dataTable?.selectCell(columnId, rowId);
    },
    [dataTable]
  );
  const globalOthers = useOthers();
  const getGlobalOtherById = (id: string) =>
    globalOthers.find((other) => other.id === id);

  useEffect(() => {
    createDataTable(room).then((dataTable) => {
      dataTable.onRowsChange(setRows);
      dataTable.onColumnsChange(setColumns);
      dataTable.onCellsChange(setCells);
      dataTable.onOthersChange((others) => {
        setUsers(others);
        setOthers(
          others.reduce<Record<string, UserInfoDataTable>>(
            (previous, current) => {
              if (current.presence?.selectedCell) {
                previous[current.presence.selectedCell] = {
                  ...current.info,
                  id: current.id,
                  globalConnectionId: getGlobalOtherById(current.id)
                    ?.connectionId,
                  connectionId: current.connectionId,
                };
              }

              return previous;
            },
            {}
          )
        );
      });
      setDataTable(dataTable);
    });
  }, [room]);

  // useEffect(() => {
  //   if (!selection && columns.length > 0 && rows.length > 0) {
  //     selectCell(columns[0].id, rows[0].id);
  //   }
  // }, [columns, rows, selection, selectCell]);

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
        users,
        others,
      }
    : null;
}
