import { Input } from '@/components/ui/input';
import { cn, getPresenceColor } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { WrapperCellProps } from './WrapperCell';
import { Row } from './types';

interface NumberCellProps<TData, TValue>
  extends WrapperCellProps<TData, TValue> {}

const NumberCell = <TData, TValue>({
  row,
  column,
  value: initialValue,
  selectCell,
  setCellValue,
  other,
}: NumberCellProps<TData, TValue>) => {
  const columnId = column.id;
  const originalRow = row.original as Row;
  const rowId = originalRow.id;

  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onChange = (e: any) => {
    setCellValue?.(columnId, rowId, e.target.value);
    setValue(e.target.value);
  };
  return (
    <Input
      onSelect={() => selectCell?.(columnId, rowId)}
      onBlur={() => selectCell?.(null, null)}
      className={cn(
        'h-full bg-transparent border-none relative focus-visible:z-10 text-right focus-visible:ring-0 focus-visible:shadow-inner-outline'
      )}
      style={{
        boxShadow: other?.globalConnectionId
          ? `inset 0 0 0 2px ${getPresenceColor(other.globalConnectionId)}`
          : undefined,
      }}
      value={value}
      onChange={onChange}
      type="number"
    />
  );
};

export default NumberCell;
