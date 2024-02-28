import { createColumnHelper } from '@tanstack/react-table';
import WrapperCell from './WrapperCell';

export type Deliverable = {
  title: string;
  channel: string;
  format: string;
};

const columnHelper = createColumnHelper();

export const financialsColumns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: WrapperCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: WrapperCell,
    meta: {
      type: 'number',
    },
  }),

  columnHelper.accessor('category', {
    header: 'Category',
    cell: WrapperCell,
    meta: {
      type: 'select',
      placeholder: 'Select...',
      options: [
        { value: 'production', label: 'Production', color: '#a21caf' },
        {
          value: 'post-production',
          label: 'Post-Production ',
          color: '#4f46e5',
        },
        { value: 'people', label: 'People', color: '#155e75' },
      ],
    },
  }),
];

export const deliverablesColumns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: WrapperCell,
    meta: {
      type: 'text',
    },
  }),

  columnHelper.accessor('format', {
    header: 'Format',
    cell: WrapperCell,
    meta: {
      type: 'select',
      placeholder: 'Select...',
      options: [
        { value: '16/9', label: '16/9', color: '#c4b5fd' },
        { value: '9/16', label: '9/16', color: '#60a5fa' },
        { value: '4/5', label: '4/5', color: '#5eead4' },
      ],
    },
  }),

  columnHelper.accessor('channel', {
    header: 'Channel',
    cell: WrapperCell,
    meta: {
      type: 'select',
      placeholder: 'Select...',
      options: [
        { value: 'instagram', label: 'Instagram', color: '#f97316' },
        { value: 'tiktok', label: 'Tiktok', color: '#7e22ce' },
        { value: 'youtube', label: 'Youtube', color: '#dc2626' },
        { value: 'website', label: 'Website', color: '#0e7490' },
      ],
    },
  }),
];

export const deliverablesData = [
  {
    title: 'Trailer',
    channel: 'instagram',
    format: '9/16',
  },
  {
    title: 'Full Aftermovie',
    channel: 'youtube',
    format: '16/9',
  },
  {
    title: 'Reel Snippets',
    channel: 'tiktok',
    format: '9/16',
  },
];

export const financialsData = [
  {
    title: 'Location Rent',
    amount: '1400',
    category: 'production',
  },
  {
    title: 'Music License',
    amount: '200',
    category: 'post-production',
  },
  {
    title: 'Model Alfie',
    amount: '200',
    category: 'crew',
  },
];
