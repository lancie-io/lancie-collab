import { DataTable } from '@/components/shared/editableTable/DataTable';
import { RoomProviderDataTable } from '@/components/shared/editableTable/liveblocks-datatable';
import { Column } from '@/components/shared/editableTable/types';
import { createInitialStorage } from '@/components/shared/editableTable/utils';
import { ClientSideSuspense } from '@liveblocks/react';
import { DeliverablesElement } from './DeliverablesBuilderElement';

interface DeliverablesProps {
  element: DeliverablesElement;
  isPreview: boolean;
}

const Deliverables = ({ element, isPreview }: DeliverablesProps) => {
  const initialStorage = createInitialStorage({
    initialColumns: initialDeliverablesColumns,
    initialRows: initialDeliverablesRows,
  });
  return (
    <div className="">
      <RoomProviderDataTable
        id={`new-datatable-deliverables-${element.id}`}
        initialPresence={{
          selectedCell: null,
        }}
        initialStorage={initialStorage}
      >
        <ClientSideSuspense fallback={'Loading datatable...'}>
          {() => <DataTable />}
        </ClientSideSuspense>
      </RoomProviderDataTable>
    </div>
  );
};

export default Deliverables;

const initialDeliverablesColumns: Column[] = [
  {
    id: 'title',
    header: 'Title',
    type: 'text',
    accessorKey: 'title',
  },
  {
    id: 'channel',
    header: 'Channel',
    type: 'select',
    accessorKey: 'channel',
    options: [
      { value: 'instagram', label: 'Instagram', color: '#fdba74' },
      { value: 'tiktok', label: 'Tiktok', color: '#f9a8d4' },
      { value: 'youtube', label: 'Youtube', color: '#fca5a5' },
      { value: 'website', label: 'Website', color: '#a5b4fc' },
    ],
  },
  {
    id: 'format',
    header: 'Format',
    type: 'select',
    accessorKey: 'format',
    options: [
      { value: '16/9', label: '16/9', color: '#d8b4fe' },
      { value: '9/16', label: '9/16', color: '#a5b4fc' },
      { value: '5/4', label: '5/4', color: '#67e8f9' },
    ],
  },
];

const initialDeliverablesRows = [
  {
    id: 'A',
    title: 'Full Aftermovie',
    channel: 'youtube',
    format: '16/9',
  },
  {
    id: 'B',
    title: 'Film Snippets',
    channel: 'tiktok',
    format: '9/16',
  },
  {
    id: '2',
    title: '1min Trailer',
    channel: 'instagram',
    format: '9/16',
  },
];
