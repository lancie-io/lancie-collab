import { DataTable } from '@/components/shared/editableTable/DataTable';
import { RoomProviderDataTable } from '@/components/shared/editableTable/liveblocks-datatable';
import { Column } from '@/components/shared/editableTable/types';
import { createInitialStorage } from '@/components/shared/editableTable/utils';
import { ClientSideSuspense } from '@liveblocks/react';
import { FinancialsCustomInstance } from './FinancialsBuilderElement';

interface FinancialsProps {
  element: FinancialsCustomInstance;
  isPreview: boolean;
}

const Financials = ({ element, isPreview }: FinancialsProps) => {
  const initialStorage = createInitialStorage({
    initialColumns: initialFinancialsColumns,
    initialRows: initialFinancialsRows,
  });
  return (
    <div className="">
      <RoomProviderDataTable
        id={`new-datatable-financials-${element.id}`}
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

export default Financials;

const initialFinancialsColumns: Column[] = [
  {
    id: 'title',
    header: 'Title',
    type: 'text',
    accessorKey: 'title',
  },
  {
    id: 'category',
    header: 'Category',
    type: 'select',
    accessorKey: 'category',
    options: [
      { value: 'production', label: 'Production', color: '#6ee7b7' },
      { value: 'post-production', label: 'Post Production', color: '#fde047' },
      { value: 'salaries', label: 'Salaries', color: '#cbd5e1' },
    ],
  },
  {
    id: 'amount',
    header: 'Amount',
    type: 'number',
    accessorKey: 'amount',
  },
];

const initialFinancialsRows = [
  {
    id: 'A',
    title: 'Location Rent',
    category: 'production',
    amount: '1500',
  },
  {
    id: 'B',
    title: 'Music License',
    category: 'post-production',
    amount: '400',
  },
  {
    id: 'C',
    title: 'Model',
    category: 'salaries',
    amount: '2200',
  },
];
