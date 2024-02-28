'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import WrapperCell from './WrapperCell';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Person = {
  name: string;
  role: string;
  phone: string;
};

export type Deliverable = {
  title: string;
  channel: string;
  format: string;
};

export type Financial = {
  status: string;
  email: string;
  amount: number;
};

const columnHelper = createColumnHelper<Person>();

export type SelectOption = {
  value: string;
  label: string;
  color: string;
};

export const personsData = [
  {
    name: 'Alex',
    role: 'camera',
    phone: '123-456-7890',
  },
  {
    name: 'Laura',
    role: 'director',
    phone: '098-765-4321',
  },
  {
    name: 'Noah',
    role: 'model',
    phone: '916-501-3188',
  },
];

type ColumnType = 'text' | 'select' | 'number';

export type ColumnMeta = {
  type: ColumnType;
};

export const personsColumns: ColumnDef<Person, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: WrapperCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('role', {
    header: 'Role',
    cell: WrapperCell,
    meta: {
      type: 'select',
      placeholder: 'Select...',
      options: [
        { value: 'director', label: 'Director', color: '#e11d48' },
        { value: 'camera', label: 'Camera', color: '#4f46e5' },
        { value: 'model', label: 'Model', color: '#0d9488' },
        { value: 'sound', label: 'Sound', color: '#ca8a04' },
      ],
    },
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: WrapperCell,
    meta: {
      type: 'text',
    },
  }),
];

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: TextCell,
//   },
//   {
//     accessorKey: 'email',
//     header: 'Email',
//   },
//   {
//     accessorKey: 'amount',
//     header: 'Amount',
//   },
// ];
