import { DataTable } from '@/components/shared/editableTable/DataTable';
import { RoomProviderDataTable } from '@/components/shared/editableTable/liveblocks-datatable';
import { Column } from '@/components/shared/editableTable/types';
import { createInitialStorage } from '@/components/shared/editableTable/utils';
import { ClientSideSuspense } from '@liveblocks/react';
import { PersonsCustomInstance } from './PersonsBuilderElement';

const initialPersonsColumns: Column[] = [
  {
    id: 'name',
    header: 'Name',
    type: 'text',
    accessorKey: 'name',
  },
  {
    id: 'role',
    header: 'Role',
    type: 'select',
    accessorKey: 'role',
    options: [
      { value: 'director', label: 'Director', color: '#e11d48' },
      { value: 'camera', label: 'Camera', color: '#4f46e5' },
      { value: 'model', label: 'Model', color: '#0d9488' },
      { value: 'sound', label: 'Sound', color: '#ca8a04' },
    ],
  },
  {
    id: 'phone',
    header: 'Phone',
    type: 'text',
    accessorKey: 'phone',
  },
];

const initialPersonsRows = [
  {
    id: 'A',
    name: 'Noah',
    role: 'model',
    phone: '916-501-3188',
  },
  {
    id: 'B',
    name: 'Liam',
    role: 'director',
    phone: '916-501-3188',
  },
  {
    id: '2',
    name: 'Olivia',
    role: 'camera',
    phone: '916-501-3188',
  },
  {
    id: '3',
    name: 'Emma',
    role: 'sound',
    phone: '916-501-3188',
  },
];

interface PersonsProps {
  element: PersonsCustomInstance;
  isPreview: boolean;
}

const Persons = ({ element, isPreview }: PersonsProps) => {
  const initialStorage = createInitialStorage({
    initialColumns: initialPersonsColumns,
    initialRows: initialPersonsRows,
  });
  return (
    <div className="">
      <RoomProviderDataTable
        id={`new-datatable-persons-${element.id}`}
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

export default Persons;
