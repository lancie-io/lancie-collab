import { Cell, Column, Row, Table } from '@tanstack/react-table';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';
import TextCell from './TextCell';

export interface WrapperCellProps<TData, TValue> {
  getValue: <TTValue = TValue>() => any;
  row: Row<TData>;
  column: Column<TData, TValue>;
  cell: Cell<TData, TValue>;
  table: Table<TData>;
  renderValue: <TTValue = TValue>() => any;
}

type ColumnDefMeta = {
  type: 'text' | 'select' | 'number';
};

const WrapperCell = <TData, TValue>(props: WrapperCellProps<TData, TValue>) => {
  const { column } = props;
  const columnMeta = column.columnDef.meta as ColumnDefMeta;

  if (columnMeta?.type === 'select') {
    return <SelectCell {...props} />;
  }
  if (columnMeta?.type === 'text') {
    return <TextCell {...props} />;
  }
  return <NumberCell {...props} />;
};

export default WrapperCell;

// <input
//   value={value}
//   onBlur={onBlur}
//   onChange={(e) => setValue(e.target.value)}
// />
