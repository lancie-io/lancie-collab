import { WrapperCellProps } from './WrapperCell';

import { Check } from 'lucide-react';

import { useView } from '@/components/providers/ViewProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TailwindColor from '@/lib/tailwind';
import { cn, getPresenceColor } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { SelectOption } from './columns';
import { Column, Row } from './types';

interface SelectCellProps<TData, TValue>
  extends WrapperCellProps<TData, TValue> {}

const SelectCell = <TData, TValue>({
  value: initialValue,
  column,
  cell,
  row,

  addOptionToColumn,
  setCellValue,
  selectCell,
  isSelected,
  other,
}: SelectCellProps<TData, TValue>) => {
  const { options = [] } = column.columnDef as ColumnDef<TData, TValue> &
    Column;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const [currentValue, setCurrentValue] = useState<string>('');
  const [currentColor, setCurrentColor] = useState<string>('');
  const columnIndex = column.getIndex();
  const rowIndex = row.index;
  const columnId = column.id;
  const originalRow = row.original as Row;
  const rowId = originalRow.id;
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function addOption(newOption: SelectOption) {
    console.log('New Option: ', newOption);
    addOptionToColumn?.(columnIndex, newOption);
    // updateColumn(column.getIndex(), {
    //   ...column.columnDef,
    //   meta: {
    //     ...columnMeta,
    //     options: [...options, newOption],
    //   },
    // });
    setOpen(false);
  }
  useEffect(() => {
    if (currentValue.length === 0) {
      const newColor = new TailwindColor({
        colorType: 'colorful',
        range: {
          min: 400,
          max: 700,
        },
      }).pick();
      setCurrentColor(newColor);
    }
  }, [currentValue]);
  const hasValue = options.find((option) => option.value === value);

  useEffect(() => {
    console.log('open changed', open);
    if (!open) {
      selectCell?.(null, null);
    }
  }, [open]);

  const { isView } = useView();
  // if (isView) {
  //   return (
  //     <Badge
  //       variant="none"
  //       style={{
  //         backgroundColor: hasValue && `${hasValue?.color}70`,
  //         border: !hasValue ? '1px solid #27282A' : undefined,
  //       }}
  //     >
  //       {value ? hasValue?.label : 'Select'}
  //     </Badge>
  //   );
  // }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isView}
          onFocus={() => {
            console.log('focused');
            selectCell?.(columnId, rowId);
          }}
          onBlur={() => {
            console.log('blurred');
            if (!open) {
              selectCell?.(null, null);
            }
          }}
          variant="none"
          role="combobox"
          className={cn(
            'p-4 w-full text-left h-full justify-start focus-visible:ring-0 focus-visible:shadow-inner-outline focus:shadow-inner-outline',
            open && 'shadow-inner-outline',
            'disabled:opacity-100'
          )}
          style={{
            boxShadow: other?.globalConnectionId
              ? `inset 0 0 0 2px ${getPresenceColor(other.globalConnectionId)}`
              : undefined,
          }}
          aria-expanded={open}
        >
          <Badge
            variant="none"
            style={{
              backgroundColor: hasValue && `${hasValue?.color}70`,
              border: !hasValue ? '1px solid #27282A' : undefined,
            }}
          >
            {value ? hasValue?.label : 'Select'}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        id="popover-content"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandInput
            value={currentValue}
            onValueChange={setCurrentValue}
            placeholder={'Search or create...'}
          />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(option.value);
                  setCellValue?.(columnId, rowId, option.value as string);
                  // updateData(row.index, column.id, option.value as any);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <Badge
                  variant="none"
                  style={{ backgroundColor: `${option.color}70` }}
                >
                  {option.label}
                </Badge>
              </CommandItem>
            ))}
            {currentValue &&
              !options.find(
                (option) => option.value === currentValue.toLowerCase()
              ) && (
                <CommandItem
                  key={currentValue.toLowerCase()}
                  value={currentValue.toLowerCase()}
                  onSelect={() => {
                    const newOption: SelectOption = {
                      label: currentValue,
                      value: currentValue.toLowerCase(),
                      color: currentColor,
                    };
                    addOption(newOption);
                    setCellValue?.(columnId, rowId, newOption.value as string);
                    setCurrentValue('');
                    setOpen(false);
                  }}
                >
                  <span className="mr-2">Create</span>
                  <Badge
                    variant="none"
                    style={{ backgroundColor: `${currentColor}70` }}
                  >
                    {currentValue}
                  </Badge>
                </CommandItem>
              )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCell;
