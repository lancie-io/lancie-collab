import { Input } from '@/components/ui/input';
import { cn, getPresenceColor } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { WrapperCellProps } from './WrapperCell';
import { Row } from './types';

interface TextCellProps<TData, TValue> extends WrapperCellProps<TData, TValue> {
  className?: string;
}

const TextCell = <TData, TValue>({
  row,
  column,
  selectCell,
  setCellValue,
  className,
  value: initialValue,
  isSelected,
  other,
}: TextCellProps<TData, TValue>) => {
  const columnIndex = column.getIndex();
  const rowIndex = row.index;
  const columnId = column.id;
  const originalRow = row.original as Row;
  const rowId = originalRow.id;

  const [value, setValue] = useState(initialValue || '');
  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);
  // const onBlur = () => {
  //   updateData(row.index, column.id, value);
  // };

  const onChange = (e: any) => {
    setCellValue?.(columnId, rowId, e.target.value);
    setValue(e.target.value);
    console.log('other id', other?.globalConnectionId);
  };

  return (
    <Input
      onSelect={() => selectCell?.(columnId, rowId)}
      onBlur={() => selectCell?.(null, null)}
      className={cn(
        'h-full bg-transparent border-none relative focus-visible:z-10 focus-visible:ring-0 focus-visible:shadow-inner-outline',
        className
      )}
      style={{
        boxShadow: other?.globalConnectionId
          ? `inset 0 0 0 2px ${getPresenceColor(other.globalConnectionId)}`
          : undefined,
      }}
      // style={{
      //   boxShadow: other && && `inset 0 0 0 2px ${getPresenceColor(
      //     other.globalConnectionId)}`,
      // }}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextCell;
