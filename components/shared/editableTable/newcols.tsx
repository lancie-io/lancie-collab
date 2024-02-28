import { ColumnDef } from '@tanstack/react-table';

type Deliverable = {
  channel: string;
  format: string;
};

export const newcols: ColumnDef<Deliverable>[] = [
  { accessorKey: '1', cell: ({ row }) => <div>Cell</div> },
];

const hello = newcols;
