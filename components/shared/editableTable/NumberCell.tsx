import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { TableMetaType } from './DataTable';
import { WrapperCellProps } from './WrapperCell';

interface NumberCellProps<TData, TValue>
  extends WrapperCellProps<TData, TValue> {}

const NumberCell = <TData, TValue>({
  getValue,
  row,
  column,
  table,
}: NumberCellProps<TData, TValue>) => {
  const { updateData } = table.options.meta as TableMetaType<TData, TValue>;

  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    updateData(row.index, column.id, value);
  };
  return (
    <Input
      className="h-full bg-transparent border-none relative focus-visible:z-10"
      value={value}
      onBlur={onBlur}
      onChange={(e) => setValue(e.target.value)}
      type="number"
    />
  );
};

export default NumberCell;
