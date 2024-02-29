import { CellContext, ColumnDef } from '@tanstack/react-table';
// import NumberCell from './NumberCell';
// import SelectCell from './SelectCell';
// import TextCell from './TextCell';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';
import TextCell from './TextCell';
import { ReactDataTable } from './react';
import { Column } from './types';

export interface WrapperCellProps<TData, TValue>
  extends CellContext<TData, TValue> {
  value?: any;
  selection?: ReactDataTable['selection'];
  selectCell?: ReactDataTable['selectCell'];
  addOptionToColumn?: ReactDataTable['addOptionToColumn'];
  setCellValue?: ReactDataTable['setCellValue'];
  isSelected?: boolean;
}

const WrapperCell = <TData, TValue>(props: WrapperCellProps<TData, TValue>) => {
  const { column, value, selection, row, isSelected } = props;

  const { type } = column.columnDef as ColumnDef<TData, TValue> & Column;
  if (type === 'select') {
    return <SelectCell {...props} />;
  }
  if (type === 'text') {
    return <TextCell {...props} />;
  }
  if (type === 'number') {
    return <NumberCell {...props} />;
  }
  return <div>This should not show.</div>;
};

export default WrapperCell;

// <input
//   value={value}
//   onBlur={onBlur}
//   onChange={(e) => setValue(e.target.value)}
// />
