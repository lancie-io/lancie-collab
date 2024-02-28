import { capitalize, idGenerator } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import WrapperCell from './WrapperCell';

export type ColumnType = 'text' | 'select' | 'number';

const columnHelper = createColumnHelper();

export const generateColumn = (type: ColumnType) => {
  let options;
  if (type === 'select') {
    options = [];
  }
  return columnHelper.accessor(idGenerator(), {
    header: capitalize(type),
    cell: WrapperCell,
    meta: {
      type,
      options,
    },
  });
};
