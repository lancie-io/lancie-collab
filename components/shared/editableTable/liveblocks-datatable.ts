import { liveblocksClient } from '@/liveblocks.config';
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';
import { Cell, Column, Row } from './types';

export type UserInfo = {
  color: string;
  name: string;
  avatar: string;
};

export type UserMetaDataTable = {
  id: string;
  info: UserInfo;
};

export type PresenceDataTable = {
  selectedCell: string | null;
};

export type StorageDataTable = {
  dataTable: LiveObject<{
    cells: LiveMap<string, LiveObject<Cell>>;
    columns: LiveList<LiveObject<Column>>;
    rows: LiveList<LiveObject<Row>>;
  }>;
};

export const {
  suspense: { RoomProvider: RoomProviderDataTable, useRoom: useRoomDataTable },
} = createRoomContext<
  PresenceDataTable,
  StorageDataTable,
  UserMetaDataTable,
  never
>(liveblocksClient);
