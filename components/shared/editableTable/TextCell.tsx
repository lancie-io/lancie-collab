import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
  };
  return (
    <Input
      onSelect={() => selectCell?.(columnId, rowId)}
      className={cn(
        'h-full bg-transparent border-none relative focus-visible:z-10',
        className
      )}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextCell;
